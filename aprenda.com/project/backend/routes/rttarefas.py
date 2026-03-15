from fastapi import APIRouter
from model.estudo_model import Estudo

tarefas_router = APIRouter(prefix="/tarefas", tags=["Tarefas"])


@tarefas_router.post("/salvar")
async def salvar_tarefa(estudo: Estudo):
    estudo.id = None
    await estudo.insert()

    return {
        "msg": "Tarefa salva com sucesso",
        "id": str(estudo.id)
    }
