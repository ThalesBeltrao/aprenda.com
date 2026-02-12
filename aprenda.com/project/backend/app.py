
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routes.rtdash import dash_router

app = FastAPI()
app.include_router(dash_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, colocar o endereco do front
    allow_methods=["*"],
    allow_headers=["*"],
)