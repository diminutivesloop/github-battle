import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FaBriefcase, FaCompass, FaUser, FaUserFriends } from "react-icons/fa";
import { battle } from "../utils/api";
import Card from "./card";
import Loading from "./loading";
import Tooltip from "./tooltip";

export function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <Tooltip text="User's location">
          <li>
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </li>
        </Tooltip>
      )}
      {profile.company && (
        <Tooltip text="User's company">
          <li>
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </li>
        </Tooltip>
      )}
      <li>
        <FaUser color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

export default function Results() {
  const [winner, setWinner] = useState();
  const [loser, setLoser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const playerOne = searchParams.get("playerOne");
  const playerTwo = searchParams.get("playerTwo");

  useEffect(() => {
    battle([playerOne, playerTwo])
      .then((players) => {
        setWinner(players[0]);
        setLoser(players[1]);
        setError(null);
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, [playerOne, playerTwo]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error center-text">{error}</p>;
  }
  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ProfileList profile={loser.profile} />
        </Card>
        <div></div>
      </div>
      <Link to="/battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </React.Fragment>
  );
}
