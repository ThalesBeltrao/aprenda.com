from fastapi import APIRouter, HTTPException, status, Depends
from config.database import coll


dash_router = APIRouter(prefix="/dash", tags=["Dash"])


@dash_router.get("/stats-materias")
async def get_stats_materias():
    # Agrega o total de horas por matéria e ornena pelas mais estudadas
    pipeline = [
        {"$group": {"_id": "$materia", "totalHoras": {"$sum": "$horas"}}},
        {"$sort": {"totalHoras": -1}},
        {"$limit": 5}
    
    
    ]

    results = list(coll.aggregate(pipeline))
    return {
        "labels": [r["_id"] for r in results],
        "series": [r["totalHoras"] for r in results]
    }


@dash_router.get("/stats-mensal")
async def get_stats_mensal():
    # Agrega total de horas por mês
    pipeline = [
        {
            "$group": {
                "_id": {"$month": "$data"},
                "totalHoras": {"$sum": "$horas"}
            }
        },
        {"$sort": {"_id": 1}}
    ]
    results = list(coll.aggregate(pipeline))
    
    # Mapeamento simples de número para nome de mês
    meses_nome = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    
    return {
        "labels": [meses_nome[r["_id"] - 1] for r in results],
        "series": [r["totalHoras"] for r in results]
    }