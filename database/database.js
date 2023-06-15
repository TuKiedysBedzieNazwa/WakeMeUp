import Realm from "realm";

const Test = {
    name: "test",
    properties:{
        name: "string",
        bool: "bool?",
        somethingToChange: "string",
        _id: "int"
    },
    primaryKey: "_id"
}
const Options = {
    name: "options",
    properties:{
        string: "string?",
        float: "float?",
        _id: "int"
    },
    primaryKey: "_id"
}
const Schema = {
    name: "location",
    properties:{
        _id: "int",
        pointLocation:"SchemaLocation"
    },
    primaryKey: "_id"
};
const SchemaLocation =  {
    name: "SchemaLocation",
    properties:{
        latitude: "float",
        longitude: "float"
    }
};

const realm = new Realm({schema:[
    Test,
    Options,
    Schema,
    SchemaLocation
]});

//      preSet      //

if(realm.objects("location")[0] == undefined){
    realm.write(() => {
        realm.create("location", {
            _id: 0,
            pointLocation:{
                latitude: 50.66665,
                longitude: 17.93356
            }
        });
    });
}

if(realm.objectForPrimaryKey("options", 0) == undefined){
    realm.write(() => {
        realm.create("options", {
            _id: 0,
            string: 'dark'
        });
    });
}

if(realm.objectForPrimaryKey("options", 1) == undefined){
    realm.write(() => {
        realm.create("options", {
            _id: 1,
            float: 0.000801
        });
    });
}

//     end of preSet     //

export const addRealmObj = () => {
    realm.write(() => {
        realm.create("test", {
            name: "tu bedzie nazwa",
            bool: false,
            somethingToChange: "change me please :c",
            _id: realm.objects("test").length
        });
    });
}

export const deleteRealmObj = () => {
    if(realm.objects("test").length != 0){
        realm.write(() => {
            realm.delete(realm.objects("test")[realm.objects("test").length - 1]);
        });
    }
}

export const changeRealmObj = (name, object) => {
    if(realm.objects(name).length != 0){
        realm.write(() => {
            realm.create(name, object, "modified");
        });
    }
}

export const getRealmObj = (name) => {
    return realm.objects(name);
}

export default realm;