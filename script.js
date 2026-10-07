var hotelWhatsApp = "220877673348";

var bookNow = document.getElementById("bookNow");
var bookingForm = document.getElementById("bookingForm");
var roomSelect = document.getElementById("room");
var checkinInput = document.getElementById("checkin");
var checkoutInput = document.getElementById("checkout");

function todayISO() {
  var date = new Date();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function scrollToBooking() {
  var booking = document.getElementById("book");
  if (booking) {
    booking.scrollIntoView({ behavior: "smooth" });
  }
}

if (checkinInput) {
  checkinInput.min = todayISO();
  checkinInput.addEventListener("change", function () {
    if (checkoutInput) {
      checkoutInput.min = checkinInput.value;
    }
  });
}

if (bookNow) {
  bookNow.addEventListener("click", function () {
    scrollToBooking();
    var nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.focus();
    }
  });
}

document.querySelectorAll(".book-room").forEach(function (button) {
  button.addEventListener("click", function () {
    if (roomSelect) {
      roomSelect.value = button.getAttribute("data-room");
    }
    scrollToBooking();
  });
});

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var room = roomSelect.value;
    var checkin = checkinInput.value;
    var checkout = checkoutInput.value;
    var request = document.getElementById("message").value.trim();

    if (checkout <= checkin) {
      window.alert("Check-out must be after check-in.");
      return;
    }

    var text =
      "Hello Hawa Boye! I want to book:\n\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Room: " + room + "\n" +
      "Check In: " + checkin + "\n" +
      "Check Out: " + checkout + "\n" +
      "Request: " + (request || "None");

    var url = "https://wa.me/" + hotelWhatsApp + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  });
}
