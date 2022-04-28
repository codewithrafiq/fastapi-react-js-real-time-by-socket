import random
import sys
import time
from fastapi import FastAPI,APIRouter,WebSocket
from matplotlib.pyplot import bar_label
import uvicorn

app = FastAPI()
route = APIRouter()


@route.get("/")
def read_root():
    return {"Hello": "World"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
        await websocket.accept()
        print("Connection accepted")
        
        
        for i in range(100):
            time.sleep(1)
            await websocket.send_text(f"{random.randint(0,50),random.randint(0,30)}")
        
        while True:
            # try:
            data = await websocket.receive_text()
            print(f"Received: {data}")
            # except KeyboardInterrupt:
            #     sys.exit(0)
            #     break


