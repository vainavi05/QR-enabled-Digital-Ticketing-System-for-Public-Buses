function generateQRCode(event) {
  event.preventDefault();

  // Retrieve user input
  var passengerName = document.getElementById("passengerName").value;
  var mobileNumber = document.getElementById("mobileNumber").value;
  var busNumber = document.getElementById("busNumber").value;
  var from = document.getElementById("fromLocation").value;
  var destination = document.getElementById("destination").value;
  var numTickets = document.getElementById("numTickets").value;

  // Format booking information
  var bookingInfo = `Name: ${passengerName}\nMobile: ${mobileNumber}\nFrom: ${from}\nBus: ${busNumber}\nDestination: ${destination}\nTickets: ${numTickets}`;

  // Generate QR Code
  var qr = new QRious({
    value: bookingInfo,
    size: 200,
    foreground: '#B1003C'
  });
  

  // Convert canvas to data URL
  var imgDataUrl = qr.toDataURL('image/png');

  // Open a new tab and write the ticket structure dynamically
  var newTab = window.open();
  newTab.document.write(`

  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <style>
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        background-color: #333;
        background-size: 400% 400%;
        animation: gradientAnimation 15s infinite;
        margin-top: 50px;
      }
  
      @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
  
        50% {
          background-position: 100% 50%;
        }
  
        100% {
          background-position: 0% 50%;
        }
      }
  
      .ticket-container {
        width: 90%;
        max-width: 590px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 30px;
        background: #e0e0e0;
        text-align: center;
        padding: 50px;
        
    }

  
  
      .left-section {
        text-align: center; /* Center text in smaller screens */
        color: #555;
      }
  
      .logo {
        width: 150px; /* Adjusted for smaller screens */
        height: 150px; /* Adjusted for smaller screens */
       
      }
  
      .ticket-info {
        width: 80%; /* Adjusted for smaller screens */
        max-width: 180px;
        height: auto;
        margin-top: 20px;
      }
  
      .footer {
        margin-top: 20px;
        text-align: center;
        color: #888;
        font-size: 14px;
      }
  
      .time-date-section {
        display: flex;
        flex-direction: column; /* Changed to column for smaller screens */
        justify-content: center; /* Center content in smaller screens */
        margin-top: 10px;
        color: #555;
      }
  
      h1 {
        font-size: 24px; /* Adjusted font size for smaller screens */
      }
  
      p {
        font-size: 14px; /* Adjusted font size for smaller screens */
      }
  
      @media only screen and (max-width: 600px) {
  .ticket-container {
    max-width: 100%;
    border-radius: 50px; /* Remove border-radius for smaller screens */
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #f7efe5;
    padding: 20px; /* Adjust padding for smaller screens */
  }
}

      @media screen and (min-width: 768px) {
        /* Add styles for larger screens if needed */
        .ticket-container {
          
          flex-direction: row; /* Reset back to row for larger screens */
          align-items: center; /* Align items to the center for larger screens */
        }
  
        .left-section {
          text-align: left;
          flex: 1; /* Take up remaining space on the left side */
        }
  
        .ticket-info {
          width: auto; /* Reset width for larger screens */
          margin-top: 0; /* Reset margin for larger screens */
        }
      }
      .button {
            margin-top: 50px;
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
  </head>
  
  <body>
  
    <div class="ticket-container">
      <div class="left-section">
        <img src="assests/logo.png" alt="Logo" class="logo">
        <p><strong>Name:</strong> ${passengerName}</p>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <div class="time-date-section">
          <p style="margin-right:10px"><strong>Time:</strong> ${getCurrentTime()}</p>
          <p><strong>Date:</strong> ${getCurrentDate()}</p>
        </div>
      </div>
      <div>
      <h1 style="color: #333;">Scan Your Ticket</h1>
      <img src="${imgDataUrl}" alt="QR Code" class="ticket-info">
  </div>

    </div>
    <button class="button" onclick="downloadTicket()">Download Ticket</button>
  
    <div class="footer">
      <p>Thank you for choosing our service.</p>
      <p>Contact us at support@example.com</p>
    </div>

  </body>
  <script>
  function downloadTicket() {
    var ticketContainer = document.querySelector('.ticket-container');
    html2canvas(ticketContainer).then(function (canvas) {
        var imgDataUrl = canvas.toDataURL("image/png");

        var a = document.createElement('a');
        a.href = imgDataUrl;
        a.download = 'ticket.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}
</script>
  
  </html>



  `);
}



function getCurrentDate() {
  var currentDate = new Date();
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
}

function getCurrentTime() {
  var currentTime = new Date();
  var options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  return currentTime.toLocaleTimeString('en-US', options);
}





