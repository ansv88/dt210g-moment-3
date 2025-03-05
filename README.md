# Webbapplikation för lagerhantering
Detta är en applikation byggd med React, TypeScript och Vite för att hantera produkter i ett lager. Användaren kan se, lägga till, uppdatera och ta bort produkter via ett enkelt gränssnitt.

## Länkar
En liveversion av webbapplikationen finns tillgänglig på följande URL:
[]

En liveversion av det använda APIet finns tillgänglig på följande URL:
[]

## Installation och Konfiguration
1. Klona källkodsfilerna

2. Kör kommando npm install för att installera nödvändiga npm-paket

3. Konfigurera API-URL i .env
    Skapa en .env-fil i projektets root-mapp och lägg till:
    ```
    VITE_API_URL=http://localhost:3000
    ```

    För produktion, ändra API:ets live-URL:
    ```
    VITE_API_URL=https://mitt-live-api.com
    ```

4. Starta utvecklingsservern med kommando npm run dev
    Applikationen körs nu på http://localhost:5173


Om du vill nyttja repot för webbtjänsten på serversidan hittar du det på följande URL: []

## UI-Komponenter
|Komponent          |Beskrivning                                           |
|-------------------|------------------------------------------------------|
| `App.tsx`         |Hanterar hela applikationen                           |
| `Header.tsx`      |Visar header med rubrik                               |
| `Layout.tsx`      |Definierar sidans layout och visar Header och Footer  |
| `HomePage.tsx`    |Visar alla produkter på startsidan                    |
| `Inventory.tsx`   |Sida för inloggad användare att hantera produkter     |
| `LoginPage.tsx`   |Sida där användare kan logga in                       |
| `ProductPage.tsx` |Sida som visar detaljerad information om en produkt   |

## Autentisering & Routing
|Fil                   |Beskrivning                                             |
|----------------------|--------------------------------------------------------|
| `AuthContext.tsx`    |Hanterar autentisering, token-lagring och validering    |
| `ProtectedRoute.tsx` |Skyddar vissa routes så att endast inloggade kan se dem |
| `routing.tsx`        |Definierar alla routes och hanterar navigering          |
| `main.tsx`           |Initialiserar appen och inkluderar routing & auth       |