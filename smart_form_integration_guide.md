# Smart Form Integration Guide

This guide outlines the technical implementation of the **Smart Form** (Intelligent Multi-step Configurator) used on the Empire Premium platforms. It is designed to help developers implement a similar system on other websites.

## 1. System Overview
The Smart Form is a dynamic, multi-step wizard that:
1.  **Fetches Content**: Pulls service categories and conditional questions from a centralized backend.
2.  **Guided Interface**: Leads the user through a series of questions based on their selection.
3.  **Lead Tracking**: Captures user contact info and attributes the lead to the specific source website.
4.  **Backend Sync**: Submits a structured JSON payload to the admin panel.

---

## 2. API Integration

### Base URL & Auth
- **Endpoint**: `https://admin.empire-premium.de/api/v1`
- **Header**: `x-api-key: [YOUR_API_KEY]`
- **Content-Type**: `application/json`

### Endpoints
#### A. Fetch Categories & Questions
`GET /categories`
Returns a list of categories. Each category contains `subcategories`, and each subcategory contains a `questions` array.

#### B. Submit Inquiry
`POST /inquiries`
Submits the final lead data and form answers.

**Request Payload Structure:**
```json
{
  "title": "Anfrage: Photovoltaik (PV)",
  "category_id": 1,
  "subcategory_id": 5,
  "contact_name": "Max Mustermann",
  "contact_email": "max@example.com",
  "contact_phone": "+49123456789",
  "location": "Bremen",
  "source_website": "https://your-new-site.com", 
  "answers": [
    {
      "question_id": 10,
      "answer_value": "Satteldach"
    },
    {
      "question_id": 11,
      "answer_value": "10 kWp"
    }
  ]
}
```

---

## 3. Frontend Implementation (React/Next.js)

### State Management
You should maintain state for the current step, the selected category, and a dictionary of answers.

```javascript
const [step, setStep] = useState('select'); // select | questions | contact | success
const [selectedCategory, setSelectedCategory] = useState(null);
const [answers, setAnswers] = useState({}); // { questionId: answerValue }
```

### Dynamic Icon/Color Mapping
Since the API returns generic category names, use a local map to style the UI:

```javascript
const iconMap = {
    "Photovoltaik (PV)": <SolarIcon />,
    "Wärmepumpe (WP)": <HeatPumpIcon />,
    // ...
};
```

### Lead Attribution Logic
To ensure the admin panel knows where the lead came from, use `window.location.origin` in the payload:

```javascript
const payload = {
    // ...
    source_website: typeof window !== "undefined" ? window.location.origin : "fallback-domain.de",
    // ...
};
```

---

## 4. Best Practices
1.  **Pre-fetching**: Fetch categories on page load (useEffect) to ensure the UI feels fast.
2.  **Validation**: Ensure email and phone fields are validated before showing the "Submit" button.
3.  **Environment Variables**: Never hardcode the API Key. Use [.env](file:///c:/Users/vlado/Desktop/admin/backend/.env) files (e.g., `NEXT_PUBLIC_API_KEY`).
4.  **Error Handling**: If the API fails (e.g., 401 Unauthorized), ensure the form shows a friendly "Service temporarily unavailable" message instead of a blank screen.

---

## 5. Backend Logic (Reference)
If you are building the backend, the logic follows this pattern:
1.  **Inquiry Model**: Stores name, email, phone, location, and `source_website`.
2.  **Cascading Saves**: When an inquiry is created, iterate through the `answers` array and save each to an `InquiryAnswer` table linked to the `inquiry_id`.
3.  **IP Tracking**: Capture the sender's IP via headers (`x-forwarded-for`) for security.
