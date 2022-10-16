const loginDetails =()=>{
    return({
        Name,
        FatherName,
        Age,
        Gender, //make sure the gender has that hindi thingy attached to it
        State,
        District,
        AssemblyConstituency
    })
}
const ElectoralSearch=()=>{
    return({
        EPICNo,
        Name,
        Age,
        RelativeName,
        State,
        District,
        PollingStation,
        AssemblyConstituency,
        ParliamentaryConstituency
    })
}

const VoterInformation =()=>{
    return({
        Name,
        AssemblyConstituency,
        ParliamentaryConstituency,
        AssemblyConstituencyNumber,
        FatherName,
        EPICNo,
        PartNumber,
        PartName,
        PollingStation,
        State
    })
}

const createUserObject =(EPICNo,
    Name,
    Age,
    RelativeName,
    State,
    District,
    PollingStation,
    AssemblyConstituency,
    ParliamentaryConstituency)=>{
    return {
        EPICNo,
        Name,
        Age,
        RelativeName,
        State,
        District,
        PollingStation,
        AssemblyConstituency,
        ParliamentaryConstituency
    }
}
module.exports = {loginDetails,ElectoralSearch,VoterInformation,createUserObject}