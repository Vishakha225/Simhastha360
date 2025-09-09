import SpeechRecognition as sr
from gtts import gTTS
import os
import difflib
from googletrans import Translator
import playsound
import sqlite3

translator = Translator()

DB_PATH = "simhastha_tools.db"

WAKE_WORD = "kumbh"

responses = {
    "hello": "Hello! How can I help you?",
    "hi": "Hi! How are you doing?",
    "how are you": "I am just a bot, but I am doing well! How about you?",
    "namaste": "Namaste! Main aapki kaise madad kar sakta hoon?",
    "booking": "You can book Ghat online via Smart Ghat Booking.",
    "lost": "Please visit the Lost & Found Center section in the app.",
    "crowd": "Live crowd status is updated every 5 minutes.",
    "support": "24/7 support is available for all pilgrims.",
    "bye": "Goodbye! Have a safe journey."
}

languages = {
    "en": "English",
    "hi": "Hindi",
    "mr": "Marathi",
    "gu": "Gujarati",
    "ta": "Tamil",
    "te": "Telugu",
    "ml": "Malayalam"
}

def db_search(query):
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()

        c.execute("SELECT ghat, date, time FROM bookings WHERE ghat LIKE ?", (f"%{query}%",))
        booking = c.fetchone()
        if booking:
            return f"Booking found: Ghat {booking[0]}, Date {booking[1]}, Time {booking[2]}."

        c.execute("SELECT name, category, description, contact FROM lost_found WHERE description LIKE ?", (f"%{query}%",))
        lost_item = c.fetchone()
        if lost_item:
            return f"Lost & Found entry: Name {lost_item[0]}, Category {lost_item[1]}, Description {lost_item[2]}, Contact {lost_item[3]}."

        conn.close()
    except:
        return None
    return None

def chatbot_response(user_input, lang='en'):
    translated_input = translator.translate(user_input, dest='en').text.lower()
    response = "Sorry, I don't understand. 🙏"

    closest = difflib.get_close_matches(translated_input, responses.keys(), n=1, cutoff=0.6)
    if closest:
        response = responses[closest[0]]
    else:
        db_ans = db_search(translated_input)
        if db_ans:
            response = db_ans

    translated_response = translator.translate(response, dest=lang).text
    return translated_response

def speak(text, lang='en'):
    try:
        tts = gTTS(text=text, lang=lang)
        tts.save("reply.mp3")
        playsound.playsound("reply.mp3")
        os.remove("reply.mp3")
    except Exception as e:
        print("⚠️ Speech output error:", e)

recognizer = sr.Recognizer()
mic = sr.Microphone()

print("🟢 Wake Word Voice Chatbot Started!")
print(f"👉 Say '{WAKE_WORD}' to activate me.\n")
print("Available languages:")
for code, name in languages.items():
    print(f"{code} = {name}")

lang_code = input("\nEnter your language code: ").strip()
if lang_code not in languages:
    print("⚠️ Invalid code, defaulting to English (en).")
    lang_code = "en"

print(f"\n🎙 Speak '{WAKE_WORD}' anytime to start talking in {languages[lang_code]}\n")

while True:
    with mic as source:
        recognizer.adjust_for_ambient_noise(source)
        print("🎧 Waiting for wake word...")
        audio = recognizer.listen(source)

    try:
        user_input = recognizer.recognize_google(audio, language="en-IN").lower()

        if WAKE_WORD in user_input:
            print("✅ Wake word detected! Start speaking...")

            while True:
                with mic as source:
                    print("Listening...")
                    recognizer.adjust_for_ambient_noise(source)
                    audio = recognizer.listen(source)

                try:
                    query = recognizer.recognize_google(audio, language=lang_code+"-"+lang_code.upper())
                    print("You said:", query)

                    if query.lower() in ["exit", "quit", "bye"]:
                        bot_reply = "Goodbye! 🙏"
                        print("Bot:", bot_reply)
                        speak(bot_reply, lang_code)
                        raise SystemExit

                    bot_reply = chatbot_response(query, lang=lang_code)
                    print("Bot:", bot_reply)
                    speak(bot_reply, lang_code)

                except sr.UnknownValueError:
                    print("❌ Could not understand audio")
                except sr.RequestError:
                    print("⚠️ Speech Recognition service unavailable")

    except sr.UnknownValueError:
        pass  
    except sr.RequestError:
        print("⚠️ Speech Recognition service unavailable")
