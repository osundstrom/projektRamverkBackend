# Projekt DT193G - StockApp 

https://projektramverkbackend.onrender.com

## Info
Uppgiften använder sig av MongoDB som databas, den är uppladdad via Render. Då det används Render både för funktioner vid inlogg och hämta innehåll till den (hemliga sidan) så kan det ta en stund då Render går ner i viloläge då den ej används. 

I databasen finns det två collection som ser ut enligt nedan.
 
### AllUsers

| id   | email    | password    | account_created   | __v  | 
| ---- | -------------- | ---------- | ---------- | -------- |
| 1  | email@mail.se  | Lösenord   | 2021-01-01 T 15:05:40     | 0 |

### AllStockItems

| id   | itemCode    | itemBrand    | itemStock  | itemPrice |  itemImage  |  __v  | 
| ---- | -------------- | ---------- | ---------- | -------- |  --------  |  --------  | 
| 1  | 123456  | Märke   | 100  | 129 | url  |   0 | 



## Användning
 Hur man användet det:

| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| GET   | /item    | Hämtar datan efter man blivit inloggad, funkar endast då man är inloggad   | 
| POST   | /item    | Registrerar en ny produkt   | 
| PUT   | /item:id    | Ändrar en produkt baserat på id| 
| DELETE   | /item:id    | Raderar en produkt baserat på id | 
| POST   | /register    | Registrerar ny användare | 
| POST   | /login    | Loggar in med en befintlig användare | 




En användare(User) har strukturen enligt nedan med JSON format. 

```json
{
  "id": "1"
   "email": "email@mail.se",
   "password": "Lösenord",
   "account_created": "2025-01-01 T 15:05:40",
    "__v": "0"
}
```
En produkt(item) har struktur enligt nedan med JSON format.

```json
{
  "id": "1"
   "itemCode": "123456",
   "itemBrand": "Märke",
   "itemStock": "100",
   "itemPrice": "129",
   "itemImage": "URL",
    "__v": "0"
}
```



