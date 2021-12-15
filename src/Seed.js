import React, {
    useState, useEffect
} from 'react';
import AddCar from './AddCar';
import Car from './Car';
import _ from 'lodash';

function Seed() {

    const[allCars,setAllCars] = useState(null);
    const[searchResults,setSearchResults] = useState(null);
    const[keywords,setKeywords] = useState("");
    const[make,setMake]=useState("");
    const[model,setModel]=useState("");
    const[year,setYear]=useState("");

    //useEffect is a side effect hook that runs after every render
    useEffect(() => {
        if(localStorage){
            const cars = JSON.parse(localStorage.getItem('cars'));
            if(cars){
                setAllCars(cars);
                setSearchResults(cars);
            }
        }
    }, []);

    function resetCars() {
        //Save the seed car data to local storage
        const seedCarData = [{
            "make": "Devil May Cry 3",
            "model": "Capcom",
            "year": 2005
        }, {
            "make": "King of Fighters XIII",
            "model": "SNK",
            "year": 2010
        }, {
            "make": "Metal Gear Solid 2",
            "model": "Konami",
            "year": 2001
        }, {
            "make": "Scarlet Nexus",
            "model": "Bandai Namco",
            "year": 2021
        }, {
            "make": "Persona 4",
            "model": "Atlus",
            "year": 2008
        }, {
            "make": "Melty Blood: Type:Lumina",
            "model": "Type Moon Games",
            "year": 2021
        }, {
            "make": "Street Fighter 3: 3rd Strike",
            "model": "Capcom",
            "year": 1999
        }, {
            "make": "Guilty Gear -Strive-",
            "model": "Arc System Works",
            "year": 2021
        }, {
            "make": "Asura's Wrath",
            "model": "CyberConnect2",
            "year": 2012
        }, {
            "make": "Danganronpa",
            "model": "Spike Chunsoft",
            "year": 2010
        }];
        setAllCars(seedCarData);
        
        saveCars(seedCarData);
    };

    function addCar(newCar) {
        const newAllCars = [...allCars,newCar];
        setAllCars(newAllCars);
        setSearchResults([...searchResults,newCar]);

       saveCars(newAllCars);
    }

    function modifyCar(carIndex, updatedCar){
        // const carToUpdate = searchResults[carIndex];
        // console.log(updatedCar, carToUpdate);
    //    setAllCars(allCars.map(car => {
    //        return car.make === updatedCar.make && car.model === updatedCar.model ? updatedCar : car;
    //    }));
        const newAllCars = _.map(allCars, (car, index) => index === carIndex ? { ...car, ...updatedCar } : car);
        const newSearchResults = _.map(searchResults, (car, index) => index === carIndex ? { ...car, ...updatedCar } : car);
        setAllCars(newAllCars);
        setSearchResults(newSearchResults);
        saveCars(newAllCars);
    }

   

    //local storage save
    function saveCars(allCars){
        if(localStorage) {
            localStorage.setItem('cars',JSON.stringify(allCars));
            console.log('Saved cars to local storage');
        }

    }

    function searchCars(evt){
       evt.preventDefault();
       let keywordsArray = [];
        if(keywords){
            keywordsArray = keywords.toLowerCase().split(' ');
        }
        if(model){
            keywordsArray.push(model.toLowerCase());
        }
        if(make){
            keywordsArray.push(make.toLowerCase());
        }
        if(year){
            keywordsArray.push(year.toString());
        }
        
        

        if(keywordsArray.length > 0){
            const results = allCars.filter(car => {
                //return keywordsArray.includes(car.make.toLowerCase()) || keywordsArray.includes(car.model.toLowerCase());
                for(const word of keywordsArray){
                    if(car.make.toLowerCase().includes(word) || 
                       car.model.toLowerCase().includes(word) ||
                       car.year === parseInt(word)){
                        return true;
                    }
                }
                return false;
            });
            setSearchResults(results);
        }
        else{
            setSearchResults(allCars);
        }
    }

    return (
        <div className="container">
             <h1> Game Catalogue </h1>
            <form>
                <div className="mb-3">
                    <label className='form-label' htmlFor="txtKeywords">Search</label>
                    <input id="txtKeywords" type="text" className="form-control" placeholder="Search" onChange={(evt) => setKeywords(evt.currentTarget.value)} value={keywords}></input>
                </div>
                <div className='mb-3 row'>
                    <div className='col-md-4'>
                        <select value={make} className='form-select' onChange={evt => setMake(evt.currentTarget.value)}>
                            <option value="">Select Title</option>
                           {/* {allCars && 
                           _.map(_.uniqBy(_.sortBy(allCars,car => car.make), car => car.make),
                           (car) => <option key={car.make} value={car.make}>{car.make}</option>)} */}
                            {_(allCars).map(car => car.make).sort().uniq().map(make => <option key={make} value={make}>{make}</option>).value()}
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <select value={model} className='form-select' onChange={evt => setModel(evt.currentTarget.value)}>
                            <option value="">Select Company</option>
                            {/* {allCars && allCars.map((car,index) => <option key={index} value={car.model}>{car.model}</option>)} */}
                            {_(allCars).map(car => car.model).sort().uniq().map(model => <option key={model} value={model}>{model}</option>).value()}
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <select value={year} className='form-select' onChange={evt => setYear(evt.currentTarget.value)}>
                            <option value="">Select Year</option>
                           {/* {allCars && allCars.map((car,index) => <option key={index} value={car.year}>{car.year}</option>)} */}
                           {_(allCars).map(car => car.year).sort().uniq().map(year => <option key={year} value={year}>{year}</option>).value()}
                        </select>
                    </div>
                </div>
                <div className='mb-3'>
                    <button type="submit" className="btn btn-primary" onClick={searchCars}>Search</button>
                </div>
            </form>
            <AddCar addCar={addCar} />
            <div className="row">
                {!allCars && <button className="btn btn-lg btn-warning" onClick={resetCars}>Save Seed Data to Local Storage</button>}
                {searchResults && searchResults.map((car, index) => {
                    return <div className="col-md-3" key={index}>
                       <Car car={car} carIndex={index} modifyCar={modifyCar} />
                    </div> 
                })}
            </div>
        </div> 
    );

}

export default Seed;