import React from 'react';

import { useNavigate } from 'react-router-dom';
import andhra_map from "../assets/images/andhramap.jpg"; // update the path if needed

const Mission = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">



                {/* Right Side Text */}
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                        "With 26 districts and <br />
                        thousands of damaged roads across Andhra Pradesh,<br />
                        we’re on a mission to fix them all.<br />
                        Let’s make a change—<br />
                        join hands for a better tomorrow!"
                    </h2>
                </div>
                {/* Left Side Image */}
                <div className="max-w-sm sm:max-w-md lg:max-w-sm">
                    <img
                        src={andhra_map}
                        alt="Report a Road Issue"
                        className="rounded-2xl  w-full object-cover"
                    />
                    <h2 className="text-2xl sm:text-2xl font-semibold text-center mt-6 text-gray-800">
                        ANDHRA PRADESH <br />

                    </h2>
                </div>




            </div>
        </section>
    );
};

export default Mission;
