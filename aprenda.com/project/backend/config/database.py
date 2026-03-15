from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from config.settings import settings
from model.estudo_model import Estudo

async def init_db():

    client = AsyncIOMotorClient(settings.MONGO_URI)

    await init_beanie(
        database=client[settings.DB_NAME],
        document_models=[Estudo]
    )
