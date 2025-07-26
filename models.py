# from pydantic import BaseModel
# from typing import Optional

# class Application(BaseModel):
#     applicationId: Optional[str]
#     name: str
#     jobTitle: str
#     status: str
#     appliedDate: str
#     interviewDate: Optional[str]
#     feedbackScore: Optional[float]
#     interviewFeedback: Optional[str]
#     salaryExpectation: Optional[float]
#     applicantSource: Optional[str]
#     candidateRating: Optional[float]
from pydantic import BaseModel
from typing import Optional

class Application(BaseModel):
    applicationId: Optional[str] = None
    name: str
    jobTitle: str
    status: str
    appliedDate: str
    interviewDate: Optional[str] = None
    feedbackScore: Optional[float] = None
    interviewFeedback: Optional[str] = None
    salaryExpectation: Optional[float] = None
    applicantSource: Optional[str] = None
    candidateRating: Optional[float] = None
