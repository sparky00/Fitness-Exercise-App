import React, { useState, useEffect } from "react";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { Box } from "@mui/system";

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState("");
  const [bodyparts, setBodyParts] = useState([]);


  useEffect(()=>{
    const fetchExercisesData = async()=>{
      const bodyPartsData = await fetchData("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", exerciseOptions);
      setBodyParts(['all', ...bodyPartsData])
    }
fetchExercisesData();

  },[]);

  const handleSearch = async () => { 
    if (search) {
      const exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", exerciseOptions);
      console.log(exercisesData)
      
      const searchedExercises = exercisesData.filter(
     (exercise)=> exercise.name.toLowerCase().includes(search)
      || exercise.target.toLowerCase().includes(search)
      || exercise.equipment.toLowerCase().includes(search)
      || exercise.bodyPart.toLowerCase().includes(search)
      );
        setSearch('');
        setExercises(searchedExercises);

    }
  };
  return (<>
    <div className=" text-center">
      <div className="card-body">
        <h2 className="card-title m-4 fw-bold fs-1">
          Awesome Exercises You Should Know
        </h2>
        <form className="ex-search">
          
          <div className="mb-3">

            <input type="email" className="form-control ex-ser" placeholder="Search Exercise"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
          </div>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
    </div>
      <Box sx={{ position: 'relative', width:'100%', p: '20px'}}>
          <HorizontalScrollBar data={bodyparts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}  />
      </Box>

    </>  
  );
};

export default SearchExercises;
