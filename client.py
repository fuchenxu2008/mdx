import socket
import struct
import pickle
import threading

class Command:
    command = ""
    payload = ""


class requestThread(threading.Thread):
    songName = ''
    fileName = ''

    def __init__(self, song_name, file_name):
        threading.Thread.__init__(self) #call the base constructor
        self.songName = song_name
        self.fileName = file_name

    def run(self):
        getCommand = Command()
        getCommand.command = "Get"
        getCommand.payload = self.songName
        packedData = pickle.dumps(getCommand)
        totalLen = len(packedData)

        s.sendall(struct.pack("i", totalLen))
        s.sendall(packedData)

        replyLen = struct.unpack("i", s.recv(4))[0]
        replyData = s.recv(replyLen)
        replyCommand = pickle.loads(replyData)

        f = open(self.fileName, "wb")
        f.write(replyCommand.payload)
        f.close()


host = "localhost"
port = 4567

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))

thread1 = requestThread('songA.mp3', 'outA.mp3')
thread1.start()

thread2 = requestThread('songB.mp3', 'outB.mp3')
thread2.start()

thread3 = requestThread('songC.mp3', 'outC.mp3')
thread3.start()

s.close()

