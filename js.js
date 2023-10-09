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
	resultTextElement.textContent = result;
  
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
  
// Function to generate a result based on user inputs
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
    let resultText = `Dear ${name},\n\n`;
    resultText += `You are a ${age}-year-old ${gender} with a complaint of ${complaint}.`;

    if (durationUnit === "days" || durationUnit === "months") {
        resultText += ` You have had this symptom for ${symptomDuration} ${durationUnit}.`;
    } else {
        resultText += ` You have had this symptom for ${symptomDuration}.`;
    }

    resultText += `\n\nChronic illness in family: ${chronicIllness}\n`;
    resultText += `Drug allergy: ${drugAllergy}\n\n`;

	if (complaint.toLowerCase() === "malaria") {
		resultText += "Here is some advice on how to manage malaria:\n";
		resultText += "- [Add advice for malaria]\n\n";
		resultText += "Here are some drugs that can be used to treat malaria:\n";
		malariaDrugs.forEach((drug, index) => {
			if (age >= drug.ageRange.min && age <= drug.ageRange.max) {
				resultText += `${index + 1}. ${drug.name} - Usage: ${drug.usage}\n`;
	
				// Calculate dosage and add it to the result
				const dosage = calculateDosage(weightKg, age);
				resultText += `   Dosage: ${dosage} mg per day\n`;

            // Debugging: Log dosage to console
            console.log(`Calculated Dosage for ${drug.name}: ${dosage} mg per day`);
			}
		});
	} else if (complaint.toLowerCase() === "fever") {
		resultText += "Here is some advice on how to manage fever:\n";
		resultText += "- [Add advice for fever]\n\n";
		resultText += "Here are some drugs that can be used to treat fever:\n";
		feverDrugs.forEach((drug, index) => {
			if (age >= drug.ageRange.min && age <= drug.ageRange.max) {
				resultText += `${index + 1}. ${drug.name} - Usage: ${drug.usage}\n`;
	
				// Calculate dosage and add it to the result
				const dosage = calculateDosage(weightKg, age);
				resultText += `   Dosage: ${dosage} mg per day\n`;
			}
		}) 
    } else if (complaint.toLowerCase() === "covid-19") {
        resultText += "For COVID-19, it is important to isolate yourself, rest, stay hydrated, and monitor your symptoms. ";
        resultText += "Consult a healthcare professional for guidance on managing your symptoms and follow local health guidelines.";
    } else {
        resultText += "Unfortunately, we don't have specific information for the entered complaint. Please consult a healthcare professional for guidance. But remember that this is a pay service.";
    }

    return resultText;
}
    
