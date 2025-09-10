import cv2
import face_recognition
import os
import numpy as np
from collections import defaultdict
import time

class FaceRecognitionSystem:
    def __init__(self, tolerance=0.5, frame_skip=2, confidence_threshold=3):
        self.tolerance = tolerance
        self.frame_skip = frame_skip
        self.confidence_threshold = confidence_threshold
        self.reference_encodings = []
        self.reference_names = []
        self.detection_buffer = defaultdict(int)
        
    def load_reference_images(self, reference_data):
        print("Loading reference images...")
        
        for image_path, name in reference_data:
            if not os.path.exists(image_path):
                print(f"Image not found: {image_path}")
                continue
                
            try:
                reference_image = face_recognition.load_image_file(image_path)
                encodings = face_recognition.face_encodings(reference_image)
                
                if len(encodings) == 0:
                    print(f"No face found in: {name}")
                    continue
                    
                encoding = encodings[0]
                
                self.reference_encodings.append(encoding)
                self.reference_names.append(name)
                print(f"Loaded reference: {name}")
                
            except Exception as e:
                print(f"Error loading {name}: {str(e)}")
        
        if len(self.reference_encodings) == 0:
            print("No valid reference images loaded!")
            return False
            
        print(f"Total reference faces loaded: {len(self.reference_encodings)}")
        return True
    
    def identify_person(self, face_encoding):
        if len(self.reference_encodings) == 0:
            return None, 0
            
        distances = face_recognition.face_distance(self.reference_encodings, face_encoding)
        best_match_idx = np.argmin(distances)
        best_distance = distances[best_match_idx]
        
        if best_distance <= self.tolerance:
            confidence = (1 - best_distance) * 100
            return self.reference_names[best_match_idx], confidence
        
        return None, 0
    
    def process_video(self, video_path, output_video=None, show_preview=True):
        if not os.path.exists(video_path):
            print(f"Video not found: {video_path}")
            return
        
        video_capture = cv2.VideoCapture(video_path)
        if not video_capture.isOpened():
            print("Could not open video!")
            return
        
        fps = int(video_capture.get(cv2.CAP_PROP_FPS))
        total_frames = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))
        duration = total_frames / fps
        
        print(f"Video Info: {total_frames} frames, {fps} FPS, {duration:.1f}s duration")
        
        video_writer = None
        if output_video:
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            frame_width = int(video_capture.get(cv2.CAP_PROP_FRAME_WIDTH))
            frame_height = int(video_capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
            video_writer = cv2.VideoWriter(output_video, fourcc, fps, (frame_width, frame_height))
        
        frame_no = 0
        processed_frames = 0
        detections = []
        start_time = time.time()
        
        print("Starting face recognition...")
        
        while True:
            ret, frame = video_capture.read()
            if not ret:
                break
            
            frame_no += 1
            
            if frame_no % self.frame_skip != 0:
                if video_writer:
                    video_writer.write(frame)
                continue
            
            processed_frames += 1
            
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            face_locations = face_recognition.face_locations(rgb_frame, model="hog")
            
            if len(face_locations) == 0:
                if video_writer:
                    video_writer.write(frame)
                continue
            
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
            
            for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
                name, confidence = self.identify_person(face_encoding)
                
                if name:
                    self.detection_buffer[name] += 1
                    
                    if self.detection_buffer[name] >= self.confidence_threshold:
                        seconds = frame_no / fps
                        timestamp = f"{int(seconds//3600):02}:{int((seconds%3600)//60):02}:{int(seconds%60):02}"
                        
                        detection_info = {
                            'name': name,
                            'frame': frame_no,
                            'timestamp': timestamp,
                            'confidence': confidence
                        }
                        detections.append(detection_info)
                        
                        print(f"{name} detected at {timestamp} (Frame: {frame_no}, Confidence: {confidence:.1f}%)")
                        self.detection_buffer[name] = 0
                    
                    color = (0, 255, 0)
                    label = f"{name} ({confidence:.1f}%)"
                else:
                    color = (0, 0, 255)
                    label = "Unknown"
                
                cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
                cv2.putText(frame, label, (left, top - 10),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
            
            if show_preview:
                try:
                    cv2.imshow("Face Recognition", frame)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        print("Stopped by user")
                        break
                except:
                    show_preview = False
                    print("Display unavailable, continuing without preview...")
            
            if video_writer:
                video_writer.write(frame)
        
        video_capture.release()
        if video_writer:
            video_writer.release()
        if show_preview:
            cv2.destroyAllWindows()
        
        total_time = time.time() - start_time
        print(f"\nProcessing Complete!")
        print(f"Total time: {total_time:.1f}s")
        print(f"Processing speed: {processed_frames/total_time:.1f} FPS")
        print(f"Total detections: {len(detections)}")
        
        if detections:
            print("\nDetection Summary:")
            for detection in detections:
                print(f"  • {detection['name']} at {detection['timestamp']} ({detection['confidence']:.1f}% confidence)")
        
        return detections


if __name__ == "__main__":
    face_system = FaceRecognitionSystem(
        tolerance=0.5,
        frame_skip=2,
        confidence_threshold=2
    )
    
    
    reference_data = [
        ("/home/rishabh/Downloads/tati.jpeg", "Person_1")
    ]
    
    print("Checking reference files:")
    for image_path, name in reference_data:
        exists = os.path.exists(image_path)
        print(f"  • {image_path} -> {'Found' if exists else 'Not found'}")
    
    if face_system.load_reference_images(reference_data):
        video_path = "/home/rishabh/Downloads/pm.mp4"
        output_path = "output_recognized.mp4"
        
        detections = face_system.process_video(
            video_path=video_path,
            output_video=output_path,
            show_preview=True
        )
    else:
        print("Failed to load reference images!")
