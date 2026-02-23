# Ierosinātie uzdevumi

## 1) Pārrakstīšanās (typo) kļūdas labojums
**Problēma:** README lokālās palaišanas piemērā ir lietotāja mapes nosaukums `Lietotajs`, kas latviešu valodas kontekstā izskatās pēc pārrakstīšanās kļūdas un var radīt neskaidrības, kopējot komandas.

**Uzdevums:** Izlabot README komandu piemēru uz neitrālu un pārnesamu ceļu (piemēram, `cd /path/to/EStoreManagementAPI`) vai korektu lietotāja vietturi.

**Pieņemšanas kritēriji:**
- README vairs nesatur cieti iekodētu lietotājvārdu ceļā.
- Komandas piemērs ir izmantojams Linux/macOS/Windows vidēs ar vietturi.

## 2) Kļūdas kodā labojums
**Problēma:** `/api/orders` endpointi ir autorizēti, bet pasūtījuma izveidē tiek uzticēts `order.UserId` no request body, nevis no JWT sub claim. Lietotājs ar derīgu tokenu var veidot pasūtījumu cita lietotāja vārdā.

**Uzdevums:** `POST /api/orders` endpointā ignorēt `order.UserId` no body un noteikt to no autentificētā lietotāja claim (`sub`), validējot, ka lietotājs eksistē.

**Pieņemšanas kritēriji:**
- `order.UserId` tiek iegūts tikai no tokena.
- Mēģinājums nosūtīt citu `UserId` body neietekmē izveidoto ierakstu.
- Ja `sub` nav pieejams/nekorekts, atgriež 401/400.

## 3) Komentāra/dokumentācijas neatbilstības labojums
**Problēma:** README sadaļā “Authentication” ir norādīts tikai `/api/auth/login`, lai gan kodā ir arī `/api/auth/register`.

**Uzdevums:** Atjaunot README autentifikācijas sadaļu un pievienot `POST /api/auth/register`, kā arī īsu aprakstu par abiem endpointiem.

**Pieņemšanas kritēriji:**
- README autentifikācijas tabulā ir gan `register`, gan `login`.
- Dokumentācija atbilst faktiskajiem endpointiem kodā.

## 4) Testu uzlabojuma uzdevums
**Problēma:** Projektā nav automatizētu testu, kas nosegtu autentifikācijas un autorizācijas kritiskos scenārijus.

**Uzdevums:** Pievienot integrācijas testu projektu ar minimāli šādiem testiem:
1. `POST /api/auth/register` izveido lietotāju.
2. `POST /api/auth/login` atgriež JWT tokenu.
3. `POST /api/orders` izmanto `sub` claim lietotāju (nevis body `UserId`).
4. Neautorizēts pieprasījums uz `/api/orders` atgriež 401.

**Pieņemšanas kritēriji:**
- Testi izpildās lokāli ar `dotnet test`.
- Ir vismaz 4 iepriekš minētie integrācijas testi.
- Testi tiek iekļauti CI pipeline (ja tāds ir pieejams).
