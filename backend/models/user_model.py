from sqlalchemy import Column, Integer, String, Boolean

from sqlalchemy.ext.declarative import declarative_base
from backend.db import Base

class UserModel(Base):
  __tablename__ = 'user'
  id = Column(Integer, primary_key=True)
  first_name = Column(String)
  last_name = Column(String)
  admin = Column(Boolean)
