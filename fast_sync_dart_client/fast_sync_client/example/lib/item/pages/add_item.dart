import 'package:example/item/item.dart';
import 'package:example/item/pages/item_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CreateItemPage extends StatelessWidget {
  String name = "";
  String description = "";
  @override
  Widget build(BuildContext context) {
    return Consumer<ItemProvider>(builder: (context, itemProvider, child) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Create Item'),
        ),
        body: Column(
          children: [
            TextField(
              onChanged: (value) {
                name = value;
              },
              decoration: InputDecoration(labelText: 'Name'),
            ),
            TextField(
              onChanged: (value) {
                description = value;
              },
              decoration: InputDecoration(labelText: 'Description'),
            ),
            ElevatedButton(
              onPressed: () async {
                await itemProvider
                    .saveElement(Item(name: name, description: description));
                Navigator.pop(context);
              },
              child: Text('Create'),
            ),
          ],
        ),
      );
    });
  }
}
