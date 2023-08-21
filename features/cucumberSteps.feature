Feature: Booking tickets
    We are testing ticket booking

    Scenario: Should book for the movie "Logan", "Зал 1" and current date
        Given user is on "client" page
        When user selects the movie "Логан", "Зал 1"
        When user selects a row and 2 a place 5
        Then user gets "QR_code"

    Scenario: Should choose the booking date
        Given user is on "client" page
        When choose the date today + 2 day
        When user selects the movie "Логан", "Зал 1"
        When user selects a row and 1 a place 5
        Then user gets "QR_code"

    Scenario: Should be Inactive booking button
        Given user is on "client" page
        When choose the date today + 0 day
        When user selects the movie "Логан", "Зал 1"
        Then booking "button" is disabled