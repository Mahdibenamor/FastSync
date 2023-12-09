<h1>Fast Sync Core</h1>
<p >    
<a href="https://img.shields.io/badge/License-MIT-green"><img     
align="center" src="https://img.shields.io/badge/License-MIT-green" alt="MIT License"></a>
<a href="https://www.npmjs.com/package/fast-sync-core"><img     
align="center" src="https://img.shields.io/npm/dm/fast-sync-core.svg?" alt="npm version"></a>
<a href="https://www.npmjs.com/package/fast-sync-core"><img     
align="center" src="https://img.shields.io/npm/v/fast-sync-core.svg?" alt="npm version"></a>
<a href="https://www.buymeacoffee.com/mahdibenamor"target="_blank"><img align="center" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="30px" width= "108px"></a>
<p >  
  
---
- [Fast Sync Core](#fast-sync-core)
- [Server installation](#server-installation)
- [Server setup](#server-setup)
- [Server syncable object ](#server-syncable-object)
- [Server syncable object data source ](#server-syncable-object-data-source)
- [Server syncalbe repository ](#server-syncalbe-repository)
- [Push and pull apis](#push-and-pull)

## Fast Sync Core

## Server installation

```json
"dependencies": {
    ...
    "fast-sync-core": "*.*.*",
    "fast-sync-mongoose-dao": "*.*.*",
    ...
  }
```

## Server setup

---

1. In your the entry point of your server, initialize your FastSync package.
2. Configure your **dao** (Data Access Object), When you initialize FastSync package in this exemple we are using mongoose dao.
3. Configure the object type to be syncked using **setSyncalbeObject** method.
4. Configure the conflict handler for the configured object type.

```ts
async function configureFastSync() {
  let fastSync: FastSync = FastSync.getInstance(
    new MongooseSyncConfiguration()
  );
  let conflictsHandler: IConflictsHandler = new ConflictsHandler(
    ConflictsResolutionStrategyEnum.PredefinedRules,
    conflictsResolutionFunction
  );
  let repo = new ItemRepository();
  await fastSync.setSyncalbeObject(Item.name, repo, conflictsHandler);
}
```

4. Call configureFastSync() in your main func after running the App.

```ts
app.listen(port, async () => {
  try {
    await configureFastSync();
    console.log("Configuration completed successfully");
  } catch (error) {
    console.error("Error configuring Fast Sync:", error);
  }
});
```

## Server Syncable Object

---

- Requires **fast-sync-mongoose-dao** package

- you need to extend SyncableObject from **fast-sync-core** and plug the type metadata schema using **plugMetadataSchema**

```ts
import { SyncableObject } from "fast-sync-core";
import { SyncableSchemaItemBuilder } from "fast-sync-mongoose-dao";
import * as mongoose from "mongoose";

export class Item extends SyncableObject {
  public name: string;
  public description: string;
  public id: string;
  constructor() {
    super();
  }
}

export const ItemSchema = SyncableSchemaItemBuilder.plugMetadataSchema(
  new mongoose.Schema({
    name: {
      type: mongoose.Schema.Types.String,
    },
    description: {
      type: mongoose.Schema.Types.String,
    },
  })
);
```

## Server Syncable Object Data Source

- Now for each SyncableObject you should have a **DataSource** don't worry every think is setted for you, just create the class.

- Note: if you need further method, can just create it there and use it.

```ts
import { SyncalbeObjectDataSource } from "fast-sync-mongoose-dao";
import { Item, ItemSchema } from "./item";

export class ItemDataSource extends SyncalbeObjectDataSource<Item> {
  constructor() {
    super(ItemSchema, Item.name);
  }
}
```

## Server Syncalbe Repository

- To interact with the objects, you should only use the repository,
  you can use the datasource, but like that you break the package.
- Note: note that you don't need to create new method in the repository, because every think is there use the defined method.
  In some rare extreme case we can create some new methods.

```ts
import { SyncalbeRepository } from "fast-sync-core";
import { Item } from "./item";
import { ItemDataSource } from "./item_datasource";

export class ItemRepository extends SyncalbeRepository<Item> {
  constructor() {
    super(new ItemDataSource(), Item.name);
  }
}
```

## Server Push And Pull

- all what you need is to define your 2 apis, one for the **/push**, the other is the **/pull**
- we decided to give you aibilty to control your api, and we are taking care of the logic behind.

```ts
 @Post("/push")
  async pushUserObjects(
    @Req() req,
    @Res() res,
    @Body() input: SyncPayload
  ) {
    try{
      let syncManager = FastSync.getInstance().getSyncManager()
      await this.syncManager.processPush(input)
      return this.success(res, {"result":"push was done with success"});
    }
    catch(err){
      return this.error(res,err);
    }
  }
```

```ts
  @Post("/pull")
  async pullUserObjects(
    @Req() req,
    @Res() res,
    @Body() metadata: SyncOperationMetadata
  ) {
    try{
      let result = await this.syncManager.processPull(metadata)
      return this.success(res, result);
    }
    catch(err){
      return this.error(res,err);
    }
  }


```

- **SyncOperationMetadata** and **SyncPayload** and 2 object handled internally in the package, don't worry they will be created from the client part. you don't need to do any thing here.

- you can add some middleware for the api if you would like.

<a href="https://github.com/Mahdibenamor/FastSync/tree/main/fast-sync-server-exemple">Full sync server exemple for mongoose dao</a>

<h1>Fast Sync Client</h1>

<p >    
<a href="https://img.shields.io/badge/License-MIT-green"><img     
align="center" src="https://img.shields.io/badge/License-MIT-green" alt="MIT License"></a>      
<a href="https://github.com/Mahdibenamor/FastSync/stargazers"><img align="center" src="https://img.shields.io/github/stars/Mahdibenamor/FastSync?style=flat&logo=github&colorB=green&label=stars" alt="stars"></a>      
<a href="https://pub.dev/packages/FastSync"><img     
align="center" src="https://img.shields.io/pub/v/fast_sync_client.svg?" alt="pub version"></a>      
<a href="https://www.buymeacoffee.com/mahdibenamor"target="_blank"><img align="center" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="30px" width= "108px"></a>    
<p >  
 
- [Dart client installation](#dart-client-installation)
- [Client Setup](#client-setup)
- [Client Syncable Object ](#client-syncable-object)
- [Run the Code Generator](#run-the-code-generator)
- [Client Syncable Object Data Source ](#client-syncable-object-data-source)
- [Client Syncalbe Repository ](#client-syncalbe-repository)
- [Http Manager](#http-manager)

## Dart client Installation

```yaml
dependencies:
  # add fast_sync_client to your dependencies
  fast_sync_client:
  # add fast_sync_hive_dao to your dependencies
  fast_sync_hive_dao:

dev_dependencies:
  # add the generator to your dev_dependencies
  build_runner:
```

## Client Setup

---

1. In your main function of your application, initialize your FastSync package.
2. Configure your **dao** (Data Access Object), When you initialize FastSync package in this exemple we are using **Hive** dao.
3. Configure the object type to be syncked using **setSyncalbeObject** method, and set the syncZone string for that type specific type.
4. initialize the type datasource and repository for that
5. Configure the conflict handler for the configured object type.
6. Configure the **httpManger**, using it you will be able to interact with your server, there you will need to implement the push and pull functions.

Note: you can set the syncZone string later, but before the you use the pull and push functions, SyncZone string is unique id, to only sync object that belong to that id.

Exemple: when you specify the user.Id as syncZone, all the object for that type, for that user will be syncked for him.

And when you specify the company.id as syncZone all the object for that type will be syncked for all the users that belong to that company.

you need specify **SyncZone**, so that the package can know to whom the object will be syncked, if is user.id only the user can see and change these objects.

![alt text](http://url/to/img.png)

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initHive();
  FastSync.setSyncConfiguration<HiveSyncConfiguration>(HiveSyncConfiguration());
  FastSync.setTypeSyncZone<Item>(SyncZoneRestrictionEnum.restricted,
      syncZone: "user2");
  FastSync.setHttpManager(HttpManager());
  ItemRepository repository = ItemRepository(dataSource: ItemDataSource());
  FastSync.setSyncableObject<Item>(
      fromJson: Item.fromJson, toJson: Item.intoJson, repository: repository);
  runApp(MyApp());
}

Future<void> initHive() async {
  var dir = await getApplicationDocumentsDirectory();
  Hive.init(dir.path);
  Hive.registerAdapter(ItemAdapter());
}

```

## Client Syncable Object

---

- Requires **fast_sync_hive_dao** package

- you need to extend SyncableItemModel from **fast_sync_hive_dao** and plug the type metadata.

```dart
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';
import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';
part 'item.g.dart';

@HiveType(typeId: 1, adapterName: "ItemAdapter")
@JsonSerializable(explicitToJson: true)
class Item extends SyncableItemModel {
  @HiveField(1)
  String name;

  @HiveField(2)
  String description;

  Item({required this.name, required this.description});

  @override
  factory Item.fromJson(Map<String, dynamic> json) => _$ItemFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ItemToJson(this);

  static Function get intoJson => _$ItemToJson;
}
```

## Run the Code Generator

Run the generator with `flutter packages pub run build_runner build`.
To automatically run it, whenever a file changes, use `flutter packages pub run build_runner watch`.

## Client Syncable Object Data Source

- Now for each SyncableObject you should have a **DataSource** don't worry every think is setted for you, just create the class.

- Note: if you need further method, can just create it there and use it.

```dart
import 'package:example/item/item.dart';
import 'package:fast_sync_hive_dao/fast_sync_hive_dao.dart';

class ItemDataSource extends SyncalbeObjectDataSource<Item> {
  ItemDataSource();
}
```

## Client Syncalbe Repository

- To interact with the objects, you should only use the repository,
  you can use the datasource, but like that you break the package.
- Note: note that you don't need to create new method in the repository, because every think is there use the defined method.
  In some rare extreme case we can create some new methods.

```dart
import 'package:example/item/item.dart';
import 'package:fast_sync_client/fast_sync_client.dart';

class ItemRepository extends SyncalbeRepository<Item> {
  ItemRepository({required super.dataSource});
}
```

## Http Manager

- HttpManger is abstract class, you need just implement the 2 methods: pull and puss
- Just you need only to make to http calls to your server, don't worry how you create the body of your calls, they will made to you.

```dart
import 'dart:async';
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:fast_sync_client/fast_sync_client.dart';

class HttpManager implements IhttpManager {
  final dio = Dio();
  HttpManager();

  @override
  Future<SyncPayload> pull(SyncOperationMetadata metadata) async {
    Response response = await dio.post(
        'https://www.server.com/pull',
        data: json.encode(metadata.toJson()));
    if (response.data["success"] == true) {
      return SyncPayload.fromJson(response.data["data"]);
    }
    return throw Exception('pull failed');
  }

  @override
  Future<bool> push(SyncPayload payload) async {
    Response response = await dio.post(
        'https://www.server.com/push',
        data: json.encode(payload.toJson()));
    if (response.data["success"] == true) {
      return true;
    }
    return throw Exception('push failed');
  }
}
```

- **SyncOperationMetadata** and **SyncPayload** and 2 object handled internally in the package, don't worry they will be created from the client part. you don't need to do any thing here.

<a href="https://github.com/Mahdibenamor/FastSync/tree/main/fast_sync_dart_client/fast_sync_client/example">Full sync client exemple for Hive dao</a>

- You can support the library by staring it on Github && liking it on pub or report any bugs you encounter.
- also, if you have a suggestion or think something can be implemented in a better way, open an issue and let's talk about it.
