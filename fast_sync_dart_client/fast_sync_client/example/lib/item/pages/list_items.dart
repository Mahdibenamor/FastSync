import 'package:example/item/pages/add_item.dart';
import 'package:example/item/pages/item_provider.dart';
import 'package:example/item/pages/update_item.dart';
import 'package:flutter/material.dart';
import 'package:example/item/item.dart';
import 'package:provider/provider.dart';

class ItemListPage extends StatefulWidget {
  List<Item> items = [];
  @override
  State<ItemListPage> createState() => ItemListPageState();
}

class ItemListPageState extends State<ItemListPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Item List'),
      ),
      body: Consumer<ItemProvider>(builder: (context, itemProvider, child) {
        return RefreshIndicator(
          onRefresh: () async {
            List<Item> loadedItems = await itemProvider.loadLocalItems();
            setState(() {
              widget.items = loadedItems;
            });
          },
          child: Column(children: [
            Container(
              height: 400,
              child: ListView.builder(
                itemCount: widget.items.length,
                itemBuilder: (context, index) {
                  Item item = widget.items[index];
                  return ListTile(
                    title: Text(item.name),
                    subtitle: Text(item.description),
                    trailing: Text("version : ${item.metadata.version}"),
                    leading: Text("sync zone : ${item.metadata.syncZone}"),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => UpdateItemPage(item: item),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
            Consumer<ItemProvider>(builder: (context, itemProvider, child) {
              return Center(
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () async {
                    await itemProvider.push();
                    setState(() {});
                  },
                  child: Text('push'),
                ),
              );
            }),
            Consumer<ItemProvider>(builder: (context, itemProvider, child) {
              return Center(
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () async {
                    await itemProvider.pull();
                    setState(() {});
                  },
                  child: Text('pull'),
                ),
              );
            }),
            Consumer<ItemProvider>(builder: (context, itemProvider, child) {
              return Center(
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () async {
                    await itemProvider.sync();
                    setState(() {});
                  },
                  child: Text('sync'),
                ),
              );
            }),
            Consumer<ItemProvider>(builder: (context, itemProvider, child) {
              return Center(
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () async {
                    await itemProvider.hardReset();
                    setState(() {});
                  },
                  child: Text('hardReset'),
                ),
              );
            }),
            Consumer<ItemProvider>(builder: (context, itemProvider, child) {
              return Center(
                child: TextButton(
                  style: ButtonStyle(
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () async {
                    await itemProvider.resetItemRepo();
                    setState(() {});
                  },
                  child: Text('delete local database'),
                ),
              );
            }),
          ]),
        );
      }),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => CreateItemPage(),
            ),
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
