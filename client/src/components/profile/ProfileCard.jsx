import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { AiFillHeart, AiFillCloseCircle } from "react-icons/ai"; // Import icons for love and cross

const ProfileCard = ({ profile, onSwipe, isTop }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Scale and opacity for love and cross icons
  const scaleLove = useTransform(x, [50, 100], [0.5, 1]);
  const opacityLove = useTransform(x, [50, 100], [0, 1]);
  const scaleCross = useTransform(x, [-100, -50], [1, 0.5]);
  const opacityCross = useTransform(x, [-100, -50], [1, 0]);

  // Rotate the card slightly while dragging
  const rotate = useTransform(x, [-100, 100], [-10, 10]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      onSwipe("right");
    } else if (info.offset.x < -100) {
      onSwipe("left");
    } else {
      // Reset to initial position if not swiped far enough
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      className="rounded-xl shadow-lg bg-cover bg-center w-1/3 z-10 absolute top-0 mx-auto rounded-xl overflow-hidden h-[90%] bottom-0 w-96"
      style={{
        x,
        y,
        rotate,
        backgroundImage: `url(${profile.profile.profilePicture})`,
      }}
      drag={isTop ? "x" : false} // Make sure dragging is only enabled for the top card
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      {/* Name label */}
      <div className="absolute bottom-0 w-full text-center pb-2 bg-gradient-to-t from-black to-transparent text-white font-semibold z-10">
        {profile.username}
      </div>
      {/* Love icon */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center"
        style={{ scale: scaleLove, opacity: opacityLove }}
      >
        <AiFillHeart size={150} className="text-red-500" />
      </motion.div>
      {/* Cross icon */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center"
        style={{ scale: scaleCross, opacity: opacityCross }}
      >
        <AiFillCloseCircle size={150} className="text-gray-500" />
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
