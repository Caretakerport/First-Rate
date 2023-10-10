// Function to calculate drug dosage
function calculateDosage(weight, age) {
    // Define the dose per kg for the specific drug (you can adjust this value)
    const dosePerKg = 5; // Example dose per kg in mg

    // Calculate the required dose
    const requiredDose = weight * dosePerKg * age;

    return requiredDose;
}

// Define the array of malaria drugs
const malariaDrugs = [
	{
	  name: "Chloroquine",
	  ageRange: { min: 1, max: 5 }, // Age range for usage
	  usage: "Take 1 tablet daily after a meal for children aged 1-5 years."
	},
	{
	  name: "Artemisinin-based combination therapy (ACT)",
	  ageRange: { min: 6, max: 18 }, // Age range for usage
	  usage: "Take 1 tablet daily after a meal for children aged 6-18 years."
	},
	// Add more malaria drugs as needed
  ];
  
  // Define the array of fever drugs
  const feverDrugs = [
	{
	  name: "Paracetamol",
	  ageRange: { min: 1, max: 100 }, // Age range for usage
	  usage: "Take as directed by a healthcare professional."
	},
	{
	  name: "Ibuprofen",
	  ageRange: { min: 1, max: 100 }, // Age range for usage
	  usage: "Take as directed by a healthcare professional."
	},
	// Add more fever drugs as needed
  ];
  
  // Get references to the containers and the buttons
  const inputContainer = document.querySelector(".Inputcontainer");
  const resultContainer = document.getElementById("result-container");
  const generateButton = document.getElementById("generate");
  const backToInputButton = document.getElementById("back-to-input");
  const saveResultButton = document.getElementById("save-result");
  const resultTextElement = document.getElementById("result-text");
  
  // Add a click event listener to the Generate button
  generateButton.addEventListener("click", function () {
	// Collect user inputs
	const age = document.getElementById("slider").value;
	const name = document.getElementById("name").value;
	const gender = document.querySelector('input[name="gender"]:checked').value;
	const complaint = document.getElementById("complaint").value;
	const symptomDuration = document.getElementById("symptom-duration").value;
	const chronicIllness = document.getElementById("chronic-illness").value;
	const drugAllergy = document.getElementById("drug-allergy").value;
	const weightKg = document.getElementById("weight").value; // Get the weight input
  
	// Define a list of fields that require validation
	const fieldsRequiringValidation = ["name", "weight", "complaint", "symptom-duration"];
  
	// Check if any of the fields requiring validation are empty
	const emptyFields = fieldsRequiringValidation.filter((field) => {
	  const value = document.getElementById(field).value;
	  if (!value) {
		const alertElement = document.getElementById(`${field}-alert`);
		alertElement.textContent = `Please enter your ${field === "weight" ? "weight in kilograms" : field}`;
		alertElement.style.color = "red"; // Set the text color to red
		alertElement.style.display = "block";
		return true;
	  }
	  return false;
	});
  
	// If there are empty fields, exit the function
	if (emptyFields.length > 0) {
	  return;
	}
  
	// Continue with generating the result
	const result = generateResult(
	  age,
	  name,
	  gender,
	  complaint,
	  symptomDuration,
	  chronicIllness,
	  drugAllergy,
	  weightKg // Pass weightKg to the generateResult function
	);
  
	// Display the result in the result container
	resultTextElement.innerHTML = result;
  
	// Show the result container and hide the input container
	inputContainer.style.display = "none";
	resultContainer.style.display = "block";
  });
  
  // Add a click event listener to the Back to Input button
  backToInputButton.addEventListener("click", function () {
	// Clear the result text
	resultTextElement.textContent = "";
  
	// Hide any validation alerts
	const validationAlerts = document.querySelectorAll(".validation-alert");
	validationAlerts.forEach((alert) => {
	  alert.textContent = "";
	  alert.style.display = "none";
	});
  
	// Show the input container and hide the result container
	inputContainer.style.display = "block";
	resultContainer.style.display = "none";
  });
  
  // Add a click event listener to the Save Your Result button
  saveResultButton.addEventListener("click", function () {
	// Replace this with your logic to save the result (e.g., to a file or database)
	alert("Result saved!");
  });
  
  function generateResult(
    age,
    name,
    gender,
    complaint,
    symptomDuration,
    chronicIllness,
    drugAllergy,
    weightKg
) {
    const durationUnit = document.getElementById("duration-unit").value;
    let resultText = `<p>Dear ${name},</p>`;
    resultText += `<p>You are a ${age}-year-old ${gender} with a complaint of ${complaint}.</p>`;

    if (durationUnit === "days" || durationUnit === "months") {
        resultText += `<p>You have had this symptom for ${symptomDuration} ${durationUnit}.</p>`;
    } else {
        resultText += `<p>You have had this symptom for ${symptomDuration}.</p>`;
    }

    resultText += `<p>Chronic illness in family: ${chronicIllness}</p>`;
    resultText += `<p>Drug allergy: ${drugAllergy}</p><br>`;

    if (complaint.toLowerCase() === "malaria") {
        resultText += `<p>Here is some advice on how to manage malaria:</p>`;
        resultText += `<ul>`;
        resultText += `<li>[Add advice for malaria]</li>`;
        resultText += `</ul>`;
        resultText += `<p>Here are some drugs that can be used to treat malaria:</p>`;
        resultText += `<ol>`;
        malariaDrugs.forEach((drug, index) => {
            if (age >= drug.ageRange.min && age <= drug.ageRange.max) {
                resultText += `<li>${index + 1}. ${drug.name} - Usage: ${drug.usage}<br>`;
                
                // Calculate dosage and add it to the result
                const dosage = calculateDosage(weightKg, age);
                resultText += `Dosage: ${dosage} mg per day</li>`;

                // If the user is an adult (age >= 18), provide adult dosage and information
                if (age >= 18) {
                    resultText += `<li>Adult Dosage: ${dosage * 2} mg per day (Example)</li>`;
                    resultText += `<li>Adult Information: [Add adult information here]</li>`;
                }

                // Debugging: Log dosage to console
                console.log(`Calculated Dosage for ${drug.name}: ${dosage} mg per day`);
            }
        });
        resultText += `</ol>`;
    } else if (complaint.toLowerCase() === "fever") {
        resultText += `<p>Here is some advice on how to manage fever:</p>`;
        resultText += `<ul>`;
        resultText += `<li>1. Drinking plenty of water</li>`;
        resultText += `<li>2. Comfortable clothing</li>`;
        resultText += `<li>3. Drinking lemon juice with warm water</li>`;
        resultText += `</ul>`;
        resultText += `<p>Here are some drugs that can be used to treat fever:</p>`;
        resultText += `<ol>`;
        feverDrugs.forEach((drug, index) => {
            if (age >= drug.ageRange.min && age <= drug.ageRange.max) {
                resultText += `<li>${index + 1}. ${drug.name} - Usage: ${drug.usage}<br>`;
                
                // Calculate dosage and add it to the result
                const dosage = calculateDosage(weightKg, age);
                resultText += `Dosage: ${dosage} mg per day</li>`;

                // If the user is an adult (age >= 18), provide adult dosage and information
                if (age >= 18) {
                    resultText += `<li>Adult Dosage: ${dosage * 2} mg per day (Example)</li>`;
                    resultText += `<li>Adult Information: [Add adult information here]</li>`;
                }
            }
        });
        resultText += `</ol>`;
    } else if (complaint.toLowerCase() === "covid-19") {
        resultText += `<p>For COVID-19, it is important to isolate yourself, rest, stay hydrated, and monitor your symptoms.</p>`;
        resultText += `<p>Consult a healthcare professional for guidance on managing your symptoms and follow local health guidelines.</p>`;
    } else {
        resultText += `<p>Unfortunately, we don't have specific information for the entered complaint.</p>`;
        resultText += `<p>Please consult a healthcare professional for guidance. But remember that this is a pay service.</p>`;
    }

    return resultText;
}
