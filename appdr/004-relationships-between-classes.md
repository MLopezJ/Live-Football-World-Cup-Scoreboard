# ADR 003: Relationships between classes

In Object Oriented Programming, there are many different types of relationships which can exist between two or more classes. Association is the type of relationship that refers as `X has a Y`. At the same time, there are two types of associations: Aggregation and Composition. 

Composition implies that the contained class cannot exist independently of the container, it is represented  by a closed diamond. With aggregation the child can exist independently of the parent and it is represented by an open diamond.

In "Live Football World Cup Scoreboard" library, there are both of those type of associations. For example, the relationship between `Game` and `Tournament` is an composition becase without a tournament there is not game happening; same idea with the relationship between `Team` and `Tournament`. On other hand, `Game` and `Team` are related in a aggregation mode, because a team can exist without a game beign created but when a game is created it needs to have 2 teams.

![UML class diagram](../img/UML-class-diagram.png)
