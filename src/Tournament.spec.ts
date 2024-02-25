import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Tournament } from "./Tournament";
import { Team } from "./Team";

void describe(`Tournament`, () => {
  void describe(`Live scoreboard`, () => {
    it(`should return matches in progress ordered ascending by total score and by most recently started when score is the same`, () => {
      // create tournament
      const worldCup = new Tournament("Fifa World Cup 2024");

      /**
       * Creation order: 
            a. Mexico    - Canada
            b. Spain     - Brazil 
            c. Germany   - France
            d. Uruguay   - Italy
            e. Argentina - Australia
       */

      // add teams to the tournament
      const MEX = worldCup.addTeam(new Team("MEX"));
      const CAN = worldCup.addTeam(new Team("CAN"));
      const ESP = worldCup.addTeam(new Team("ESP"));
      const BRA = worldCup.addTeam(new Team("BRA"));
      const DEU = worldCup.addTeam(new Team("DEU"));
      const FRA = worldCup.addTeam(new Team("FRA"));
      const URY = worldCup.addTeam(new Team("URY"));
      const ITA = worldCup.addTeam(new Team("ITA"));
      const ARG = worldCup.addTeam(new Team("ARG"));
      const AUS = worldCup.addTeam(new Team("AUS"));

      /**
       * Update order: 
            a. Mexico    0 - 5 Canada 
            b. Spain    10 - 2 Brazil 
            c. Germany   2 - 2 France 
            d. Uruguay   6 - 6 Italy 
            e. Argentina 3 - 1 Australia 
       */

      // create matches
      const MEX_CAN = worldCup.addMatch(MEX, CAN);
      const ESP_BRA = worldCup.addMatch(ESP, BRA);
      const DEU_FRA = worldCup.addMatch(DEU, FRA);
      const URY_ITA = worldCup.addMatch(URY, ITA);
      const ARG_AUS = worldCup.addMatch(ARG, AUS);

      MEX_CAN?.setGoal(0, 5);
      ESP_BRA?.setGoal(10, 2);
      DEU_FRA?.setGoal(2, 2);
      URY_ITA?.setGoal(6, 6);
      ARG_AUS?.setGoal(3, 1);

      /**
       * Expected order:
            1. Uruguay   6 - 6 Italy 
            2. Spain    10 - 2 Brazil 
            3. Mexico    0 - 5 Canada
            4. Argentina 3 - 1 Australia 
            5. Germany   2 - 2 France 
       */

      // 1 element of the live scoreboard should be the match URY_ITA
      assert.equal(worldCup.getLiveScoreboard()[0]?.matchId, URY_ITA?.getId());
      // 2 element of the live scoreboard should be the match ESP_BRA
      assert.equal(worldCup.getLiveScoreboard()[1]?.matchId, ESP_BRA?.getId());
      // 3 element of the live scoreboard should be the match MEX_CAN
      assert.equal(worldCup.getLiveScoreboard()[2]?.matchId, MEX_CAN?.getId());
      // 4 element of the live scoreboard should be the match ARG_AUS
      assert.equal(worldCup.getLiveScoreboard()[3]?.matchId, ARG_AUS?.getId());
      // 5 element of the live scoreboard should be the match DEU_FRA
      assert.equal(worldCup.getLiveScoreboard()[4]?.matchId, DEU_FRA?.getId());
    });
  });

  void describe(`Teams`, () => {
    void it(`should not crate match if team is not register in the tournament`, () => {
      // create tournament
      const worldCup = new Tournament("Fifa World Cup 2024");

      // create teams
      const CRC = new Team("CRC");
      const NOR = new Team("NOR");

      // register teams in tournament
      worldCup.addTeam(CRC);

      // add matchs
      worldCup.addMatch(CRC, NOR);

      // expect live scoreboard does not have it
      assert.equal(worldCup.getLiveScoreboard().length, 0);
    });

    void it(`should not crate match if one of the teams has an active match`, () => {
      // create tournament
      const worldCup = new Tournament("Fifa World Cup 2024");

      // create teams
      const CRC = new Team("CRC");
      const NOR = new Team("NOR");
      const SWE = new Team("SWE");

      // register teams in tournament
      worldCup.addTeam(CRC);
      worldCup.addTeam(NOR);
      worldCup.addTeam(SWE);

      // add matchs
      worldCup.addMatch(CRC, NOR);
      worldCup.addMatch(NOR, SWE);

      // expect live scoreboard does not have NOR vs SWE
      assert.equal(worldCup.getMatch(NOR, SWE), undefined);
    });
  });
});
