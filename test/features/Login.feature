Feature: This is a login script for twitter
  In order to acces my tweets
  As a developer
  I want to login to twitter using node-twitter

  Scenario: Loggin in
    Given I am not logged in
    When I send a GET /login request
    Then node-twitter should log me in
