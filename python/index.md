# Python



* String & Bytes
** bytes to string
#+begin_src python
return b"abc123".decode("utf-8")
#+end_src

#+RESULTS:
: abc123
** string to bytes
#+begin_src python
return "abc123".encode("utf-8")
#+end_src

#+RESULTS:
: b'abc123'

* Arguments

** argparse
#+begin_src python
import argparse

# Create the parser object
parser = argparse.ArgumentParser(description='Process something')

# Add an argument to the parser
parser.add_argument('integers', metavar='N', type=int, help='an integer to be processed')

# Parse the arguments
args = parser.parse_args()

# Access the parsed arguments
print(args.integers)
#+end_src


* File

** file exists
#+begin_src python
import os

filename = "example.txt"
if os.path.exists(filename):
    print("File exists")
else:
    print("File does not exist")
#+end_src

* Json

** load from file
#+begin_src python
with open('data.json', 'r') as f:
    data = json.load(f)

print(data)
#+end_src

** dump to file

#+begin_src python
with open('data.json', 'w') as f:
    json.dump(data, f)
#+end_src


** dump class to file
#+begin_src python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("John Smith", 35)

with open('person.json', 'w') as f:
    json.dump(person.__dict__, f)
#+end_src


** load class from file

#+begin_src python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

with open('person.json', 'r') as f:
    data = json.load(f)
    person = Person(data['name'], data['age'])

print(person.name)
print(person.age)
#+end_src

* Time
#+begin_src python
from time import gmtime, localtime, strftime

def print_gmtime():
    strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

def print_localtime():
    return strftime("%a, %d %b %Y %H:%M:%S +0000", localtime())
#+end_src

#+RESULTS:
: None

* socket

** server
#+begin_src python
# Echo server program
import socket
from time import gmtime, strftime

HOST = '192.168.97.2'                 # Symbolic name meaning all available interfaces
PORT = 50007              # Arbitrary non-privileged port
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen(1)
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(1024)
            print(strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime()) + "receive: " + str(data))
            if not data: break
            conn.sendall(data)
#+end_src

** client
#+begin_src python
# Echo client program
import socket
import time

HOST = '192.168.97.2'    # The remote host
PORT = 50007              # The same port as used by the server
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    while True:
        s.sendall(b'Hello, world')
        data = s.recv(1024)
        print('Received', repr(data))
        time.sleep(1)
#+end_src

* class
** super
 + 理论上 =super()= 可以直接 call 嗷, 返回父类
   - 调用父类函数时候, self指向的是子类

 + 多继承的时候, 直接 =super().func()= 会从 mro 中, 从第二个找拥有 =func()= 的类
   - 如果使用 =super(clazz, self).func()= 则会从 clazz.mro 中的第二个类开始找

* plot

- networkx \rightarrow graphviz

** networkx to graphviz

#+begin_src python
import graphviz
import networkx as nx

G = nx.DiGraph()
# G.add_node(u)
# G.add_edge(u, v, label=label)
A = nx.nx_agraph.to_agraph(G)
A.layout("dot")
A.draw('graph.pdf')
#+end_src

** dot
- example
#+begin_src example
digraph {
  rankdir=LR;
  node [shape=ellipse];
  edge [color=red];

  A [label="Start"];
  B [label="Read input"];
  C [label="Process input"];
  D [label="Write output"];
  E [label="Stop"];

  A -> B;
  B -> C;
  C -> D [label="Yes"];
  D -> E;
  C -> E [label="No"];

  {rank=same; B C}
}
#+end_src


*** cli
#+begin_src shell
dot -Tpng -Kdot -odot.png example.dot
#+end_src

