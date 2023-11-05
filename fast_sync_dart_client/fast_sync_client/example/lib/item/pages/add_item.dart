import 'package:flutter/material.dart';

class CreateItemPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Item'),
      ),
      body: Column(
        children: [
          TextField(
            onChanged: (value) {
              // Set the name of the new item
            },
            decoration: InputDecoration(labelText: 'Name'),
          ),
          TextField(
            onChanged: (value) {
              // Set the description of the new item
            },
            decoration: InputDecoration(labelText: 'Description'),
          ),
          ElevatedButton(
            onPressed: () {
              // Create the new item and navigate back to the item list
            },
            child: Text('Create'),
          ),
        ],
      ),
    );
  }
}
