from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from linkedin_api import Linkedin
from backend.scrape import scrape_website, extract_body_content, clean_body_content, split_dom_content
from backend.parse import parse_with_cohere

# Load environment variables
load_dotenv()

app = FastAPI()

# LinkedIn API credentials
API_KEY = 'kanungoabhigya3750@gmail.com'
API_SECRET = 'akshu3750'

# Pydantic model for requests
class LinkedInRequest(BaseModel):
    username: str

class ScrapeRequest(BaseModel):
    url: str

class ParseRequest(BaseModel):
    url: str
    parse_description: str

@app.post("/fetch_linkedin_profile/")
async def fetch_linkedin_profile(request: LinkedInRequest):
    api = Linkedin(API_KEY, API_SECRET)
    try:
        data = api.get_profile(request.username)
        formatted_data = {
            'name': f"{data['firstName']} {data['lastName']}",
            'headline': data.get('headline', ''),
            'summary': data.get('summary', ''),
            'location': data.get('geoLocationName', ''),
            'industry': data.get('industryName', ''),
            'education': [{'school': edu['schoolName'], 'degree': edu.get('degreeName', '')} for edu in data.get('education', [])],
            'experience': [{'title': exp['title'], 'company': exp['companyName']} for exp in data.get('experience', [])],
            'skills': data.get('skills', []),
            'profile_url': f"https://www.linkedin.com/in/{data['public_id']}",
        }
        return formatted_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching profile: {str(e)}")

@app.get("/test/")
async def test(request: ScrapeRequest):
    return {"Message": "Working Fine!"}
    
@app.post("/scrape_website/")
async def scrape_website_data(request: ScrapeRequest):
    try:
        result = scrape_website(request.url)
        body_content = extract_body_content(result)
        cleaned_content = clean_body_content(body_content)
        dom_chunks = split_dom_content(cleaned_content)
        return {"dom_chunks": dom_chunks}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error scraping website: {str(e)}")

@app.post("/parse_content/")
async def parse_content(request: ParseRequest):
    try:
        dom_chunks = scrape_website(request.url)
        body_content = extract_body_content(dom_chunks)
        cleaned_content = clean_body_content(body_content)
        dom_chunks = split_dom_content(cleaned_content)
        
        parsed_results = parse_with_cohere(dom_chunks, request.parse_description)
        return {"parsed_results": parsed_results}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing content: {str(e)}")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)