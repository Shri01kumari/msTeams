$(document).ready(function () {
  $("#calendar").evoCalendar({
    //settingName: settingValue
    // theme: "Midnight Blue",
    calendarEvents: [
      {
        id: "event1", // Event's ID (required)
        name: "New Year's Day", // Event name (required)
        date: "January/1/2020", // Event date (required)
        //description:"",
        type: "holiday", // Event type (required)
        everyYear: true, // Same event every year (optional)
      },
      {
        id: "event2",
        name: "Lohri",
        date: "January/13/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event3",
        name: "Labour Day",
        date: "May/1/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event4",
        name: "Pongal",
        date: "January/14/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event5",
        name: "Makar Sankranti",
        date: "January/14/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event6",
        name: "Guru Govind Singh Jayanti",
        date: "January/20/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event7",
        name: "Republic Day",
        date: "January/26/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event8",
        name: "Vasant Panchami",
        date: "February/16/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event9",
        name: "Vasant Panchami",
        date: "February/16/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event10",
        name: "Shivaji Jayanti",
        date: "February/19/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event11",
        name: "Hazarat Ali's Birthday",
        date: "February/26/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event12",
        name: "Guru Ravidas Jayanti",
        date: "February/27/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event13",
        name: "Mahashivaratri",
        date: "March/11/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event14",
        name: "Holi",
        date: "March/29/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event15",
        name: "Good Friday",
        date: "April/2/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event16",
        name: "Gudi Padwa",
        date: "April/13/2020",
        type: "holiday",
        everyYear: true,
      },
      {
        id: "event17",
        name: "Ambedkar Jayanti",
        date: "April/14/2020",
        type: "holiday",
        everyYear: true,
      },

    ],
  });
});
