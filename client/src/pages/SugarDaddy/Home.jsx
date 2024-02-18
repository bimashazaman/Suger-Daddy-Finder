import React, { useEffect, useState } from "react";
import PageLayout from "../../components/layouts/PageLayout";
import ProfileCard from "../../components/profile/ProfileCard";
import useFetchSugarBabies from "../../hooks/useFetchSugarBabies";

const Home = () => {
  const { sugarBabies, status, error } = useFetchSugarBabies();
  const [profiles, setProfiles] = useState([]);

  // Fetch sugar babies and update profiles when sugar babies are successfully fetched
  useEffect(() => {
    if (status === "succeeded") {
      setProfiles(sugarBabies);
    }
  }, [sugarBabies, status]);

  // Function to handle swipe action
  const handleSwipe = (id, direction) => {
    console.log(`Swiped ${direction} on profile with id: ${id}`);
    // Remove the swiped profile from the list
    setProfiles((prevProfiles) =>
      prevProfiles.filter((profile) => profile._id !== id)
    );
  };

  console.log(profiles, "profiles");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <PageLayout>
      <div className="relative h-full w-full flex justify-center items-center">
        <div className="h-screen w-1/3 z-10 absolute top-0 left-0 bg-gradient-to-t from-black to-transparent text-white font-semibold z-10">
          {/* Left overlay */}
        </div>
        <div className="flex items-center">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={profile._id}
              profile={profile}
              onSwipe={(direction) => handleSwipe(profile._id, direction)}
              isTop={index === profiles.length - 1}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
