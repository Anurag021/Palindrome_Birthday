var dateOfBirth = document.querySelector("#date-Of-Birth")
var btnCheckPlindrome = document.querySelector("#btn-Check-Palindrome")
var output = document.querySelector("#result")
var outputPreviousDate = document.querySelector("#output-prevDate")
 
var inputDate 
var date ={
    day:"",month:"",year:""
}
btnCheckPlindrome.addEventListener("click",clickHandler)

function clickHandler(){
    console.log("clicked")
    var bdayStr = (dateOfBirth.value);

    if(bdayStr!==""){
        var listOfDates = bdayStr.split("-");

        var date = { 
            day: Number(listOfDates[2]),
            month: Number(listOfDates[1]),
            year: Number(listOfDates[0])
        };

        var isPalindrome = checkPalindromeForAllDatesFormat(date)

        if(isPalindrome){
            output.innerText = "Your Birthday is a Palindrome"
        }else{
            var[count, nextDate] = getNextPalindromeDate(date)
            var[countPrev, prevDate] = getPreviousPalindromeDate(date)

            output.innerText = "The Next palindrome date is "+ nextDate.day+"-"+ nextDate.month+"-"+ nextDate.year+" you missed is it by "+count+" days "+
            "And The Previous palindrome date is "+ prevDate.day+"-"+ prevDate.month+"-"+ prevDate.year+" you missed is it by "+countPrev+" days"

        }
    }
}




// function checkPalindrome(){
//     console.log("clicked")
//     inputDate = dateOfBirth.value
//     console.log(inputDate)
//     var split = inputDate.split("-")
//     date.day = split[2]
//     date.month = split[1]
//     date.year = split[0]
//     console.log(date)
//     var nextpalindromedate = getNextPalindromeDate(date)
//     outputNextDate.innerText = "The Next Palindrome Date is "+nextpalindromedate[1].day+"-"+nextpalindromedate[1].month+"-"+nextpalindromedate[1].year+" and is " +nextpalindromedate[length] + " days away"

//     inputDate = dateOfBirth.value
//     console.log(inputDate)
//     var split = inputDate.split("-")
//     date.day = split[2]
//     date.month = split[1]
//     date.year = split[0]
//     console.log(date)
//     var prevpalindromedate = getPreviousPalindromeDate(date)
//     outputPreviousDate.innerText = "And The Previous Palindrome Date is "+prevpalindromedate[1].day+"-"+prevpalindromedate[1].month+"-"+prevpalindromedate[1].year+" and is " +prevpalindromedate[length] + " days away"
// }

function reverseString(str){
    
    var reverse = str.split("").reverse().join('');
    return reverse;
}

function isPalindrome(str){
    
    var reverse = reverseString(str)
    if (str === reverse){
        return true;
    }else {
        return false;
    }
}

function convertDateToString(date){
    var datestr = {day:"", month:"", year:""};

    if (date.day < 10){
        datestr.day = "0"+ date.day
    }else{
        datestr.day = date.day.toString()
    }

    if (date.month < 10){
        datestr.month = "0"+ date.month
    }else{
        datestr.month = date.month.toString()
    }

    datestr.year = date.year.toString()
    return (datestr)
}
function getAllDateFormats(date){

    var datestr = convertDateToString(date);

    var ddmmyyyy = datestr.day + datestr.month + datestr.year;
    var mmddyyyy = datestr.month + datestr.day + datestr.year
    var yyyymmdd = datestr.year + datestr.month + datestr.day
    var ddmmyy = datestr.day + datestr.month + datestr.year.slice(-2)
    var mmddyyyy = datestr.month + datestr.day + datestr.year
    var yymmdd = datestr.year.slice(-2) + datestr.month + datestr.day

    return ([ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyyyy, yymmdd])

}



function checkPalindromeForAllDatesFormat(date){
    var flag = false;
    var listOfDates = getAllDateFormats(date);

    for (var i =0; i<listOfDates.length; i++){
        if(isPalindrome(listOfDates[i])){
            flag = true
            break;
        }
    //  console.log(listOfDates[i])
    }
    return flag;
}


// ---------------------------------------------

function isLeapYear(year){
    if(year % 400 ===0){ return true}
    if (year % 100 ===0){return true}
    if(year % 4 ===0){return true}
    return false
}

function getNextDate(date){
    day = date.day + 1
    month = date.month
    year = date.year
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month ===2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1
                month++;   
            } }
        else{
            if(day>28){
                day = 1
                month++;   
            }}}
    else{
         if(day > daysInMonth[month-1]){
      day = 1
      month++;   
    }}
    if(month>12){
        month =1
        year++
    }

    return{
        day: day,
        month: month,
        year: year
    };
}


function getNextPalindromeDate(date){

    var count = 0
    var nextDate = getNextDate(date)
    
    while(1){
    count++
    var isPalindrome = checkPalindromeForAllDatesFormat(nextDate)
        if(isPalindrome){
        break
        }
    nextDate = getNextDate(nextDate)
    // console.log(nextDate)
    }
    return [count, nextDate]
}

// function to get next previous date
function getPreviousDate(date){
    day = date.day - 1
    month = date.month
    year = date.year

    if(isLeapYear(year)){
        var daysInMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
    }else{
        var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    }

    if(day===0){
        month --;
        if(month === 0){
            month = 12;
            year = year-1;
        }
     day = daysInMonth[month-1]
    }
    return{
        day: day,
        month: month,
        year: year
    };
}
//function to get next previous palindrome date

function getPreviousPalindromeDate(date){

    var count = 0
    var prevDate = getPreviousDate(date)
    
    while(count<1000){
    count++
    var isPalindrome = checkPalindromeForAllDatesFormat(prevDate)
        if(isPalindrome){
        break
        }
    prevDate = getPreviousDate(prevDate)
    // console.log(prevDate)
    }
    return [count, prevDate]
}

// var date = {
//     day:"14",
//     month:"06",
//     year:"1994"
// }

// console.log(getPreviousPalindromeDate(date))
