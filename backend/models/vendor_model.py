from sqlalchemy import Column, Integer, String

from sqlalchemy.ext.declarative import declarative_base
from backend.db import Base

class VendorModel(Base):
  __tablename__ = 'vendor'
  id = Column(Integer, primary_key=True)
  name = Column(String)
  description = Column(String)
  external_link = Column(String)
  category = Column(String)
  status = Column(Integer)
  risk = Column(String)
  tier = Column(String)
