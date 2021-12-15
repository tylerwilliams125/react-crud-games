import React, {
    useState
} from 'react';

function AddCar(props){
  
    const[carMake,setCarMake] = useState("");
    const[carModel,setCarModel] = useState("");
    const[carYear,setCarYear] = useState("");
    
    function doWork(){
        
        const newCar = {"make":carMake,"model":carModel,"year":parseInt(carYear)};
        // const newAllCars = [...props.allCars,newCar];
        // props.setAllCars(newAllCars);
        // props.setSearchResults([...props.searchResults,newCar]);

        // if(localStorage) {
        //     localStorage.setItem('cars',JSON.stringify(newAllCars));
        //     console.log('Saved new car to local storage');
        // }
        props.addCar(newCar);
    }

    return(
        <div className="row mb-3">
            <div className="col-md-3">
                <label htmlFor="txtMake" className='form-label'>Title</label>
                <input type="text" id="txtMake" placeholder="Game Title" className="form-control" onChange={(evt) => setCarMake(evt.currentTarget.value)} value={carMake} />
            </div>
            <div className="col-md-3">
                <label htmlFor="txtModel" className='form-label'>Company</label>
                <input type="text" id="txtModel" placeholder="Game Company" className="form-control" onChange={(evt) => setCarModel(evt.currentTarget.value)} value={carModel} />
            </div>
            <div className="col-md-3">
                <label htmlFor="txtYear"className='form-label'>Year</label>
                <input type="text" id="txtYear" placeholder="Release Year" className="form-control" onChange={evt => setCarYear(evt.currentTarget.value)} value={carYear} />
            </div>
            <div className="col-md-3">
                <button type="button" id="btnAdd" className="btn btn-lg btn-secondary" onClick={doWork}>Add Game</button>
            </div>    
        </div>
    );

}

export default AddCar;