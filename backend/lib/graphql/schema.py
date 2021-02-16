import graphene
import sqlalchemy
from graphene import ObjectType, String, Schema
from sqlalchemy import or_, and_, asc
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.user_model import UserModel
from models.vendor_model import VendorModel
from backend.db import db_session


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel


class Vendor(SQLAlchemyObjectType):
    class Meta:
        model = VendorModel


class Query(ObjectType):
    users = graphene.List(User)
    user = graphene.Field(User, id=graphene.Int())

    vendors = graphene.List(Vendor)
    # vendor = graphene.Field(Vendor, id=graphene.Int())

    filter = graphene.List(Vendor, categories=graphene.List(
        String), status=graphene.Int(), risk=graphene.String(), sort=graphene.String(), name=graphene.String())

    def resolve_users(root, info):
        query = User.get_query(info)  # SQLAlchemy query
        return query.all()

    def resolve_user(root, info, id):
        query = User.get_query(info)
        return query.filter(UserModel.id == id).first()

    def resolve_vendors(root, info):
        query = Vendor.get_query(info)
        return query.all()

    def resolve_filter(root, info, categories=None, status=None, risk=None, sort=None, name=None):
        query = Vendor.get_query(info)
        if categories:
            query = query.filter(
                or_(VendorModel.category == v for v in categories))

        if status:
            query = query.filter(VendorModel.status == status)

        if risk:
            query = query.filter(VendorModel.risk == risk)

        if sort:
            return query.order_by(getattr(VendorModel, sort))

        if name:
            return query.filter(VendorModel.name.startswith(name))

        return query.all()


class UpdateCategory(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        category = graphene.String()
        admin = graphene.Boolean()
    ok = graphene.Boolean()
    vendor = graphene.Field(lambda: Vendor)

    def mutate(self, info, id, category, admin):
        ok = False
        if admin:
            Vendor.get_query(info).filter(VendorModel.id ==
                                          id).update({"category": category})
            db_session.commit()
            ok = True
            return ok
        return ok


class UpdateStatus(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        status = graphene.Int()
        admin = graphene.Boolean()

    ok = graphene.Boolean()
    vendor = graphene.Field(lambda: Vendor)

    def mutate(self, info, id, status, admin):
        ok = False
        if admin:
            Vendor.get_query(info).filter(VendorModel.id ==
                                          id).update({"status": status})
            db_session.commit()
            ok = True
            return ok
        return ok


class Mutation(ObjectType):
    updateCategory = UpdateCategory.Field()
    updateStatus = UpdateStatus.Field()


schema = Schema(query=Query, mutation=Mutation)
