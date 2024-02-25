# ADR 004: Relationships between classes

In Object Oriented Programming, there are many different types of relationships which can exist between two or more classes. Association is the type of relationship that refers as `X has a Y`. At the same time, there are two types of associations: Aggregation and Composition.

Composition implies that the contained class cannot exist independently of the container, it is represented by a closed diamond. With aggregation the child can exist independently of the parent and it is represented by an open diamond.

In "Live Football World Cup Scoreboard" library, there are both of those type of associations. For example, the relationship between `Match` and `Tournament` is an composition becase without a tournament there is not any match happening; same idea with the relationship between `Match` and `Team`, without teams is not possible to create matches. On other hand, `Team` and `Tournament` are related in a aggregation mode, because a team can exist without the `Tournament` class beign created but a tournament has teams.

![UML class diagram](../img/UML-class-diagram.png)
