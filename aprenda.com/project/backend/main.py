
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routes.rtdash import dash_router
from config.database import init_db
from routes.rttarefas import tarefas_router




app = FastAPI()

@app.on_event("startup")
async def start_db():
    await init_db()


app.include_router(dash_router)
app.include_router(tarefas_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, colocar o endereco do front
    allow_methods=["*"],
    allow_headers=["*"],
)