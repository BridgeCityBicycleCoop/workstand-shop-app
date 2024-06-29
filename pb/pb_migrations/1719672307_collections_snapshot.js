/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2024-05-16 18:57:22.625Z",
      "updated": "2024-06-13 18:15:46.105Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "maxSelect": 1,
            "maxSize": 5242880,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "4coh8ljb",
          "name": "phone",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "onlyVerified": false,
        "requireEmail": false
      }
    },
    {
      "id": "h2yv3aff7ompvx2",
      "created": "2024-05-21 22:09:04.552Z",
      "updated": "2024-06-18 15:09:01.822Z",
      "name": "members",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "jkhkhhye",
          "name": "status",
          "type": "select",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "active",
              "suspended",
              "banned"
            ]
          }
        },
        {
          "system": false,
          "id": "nhmgp4bd",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "cgwrnuey",
          "name": "preferredName",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "abgzz974",
          "name": "pronouns",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "j3xlkxvg",
          "name": "email",
          "type": "email",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        },
        {
          "system": false,
          "id": "vih2ypev",
          "name": "emailConsent",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "lulzxbks",
          "name": "phone",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "u8lvze1t",
          "name": "requiresGuardian",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "pjkjqcg4",
          "name": "guardianName",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "lkmtuiwk",
          "name": "postalCode",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "imfmj2tx",
          "name": "waiver",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "j2yjh7z0",
          "name": "notes",
          "type": "editor",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "convertUrls": false
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "1pjd8phr3ds8zt7",
      "created": "2024-06-04 01:38:54.384Z",
      "updated": "2024-06-05 14:20:32.911Z",
      "name": "visits",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "zd38fmi9",
          "name": "memberId",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "h2yv3aff7ompvx2",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "2rzrt2hk",
          "name": "purposeId",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "ou5ifeht9f3kemp",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "lhcqxvgg",
          "name": "date",
          "type": "date",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "ou5ifeht9f3kemp",
      "created": "2024-06-04 01:39:17.183Z",
      "updated": "2024-06-04 15:02:47.122Z",
      "name": "purposes",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "9aaopxz2",
          "name": "name",
          "type": "text",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "",
      "viewRule": "",
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
