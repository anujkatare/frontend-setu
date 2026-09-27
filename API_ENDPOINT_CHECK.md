# SETU frontend API cross-check

Cross-checked against the Spring Boot controller and DTO source supplied with the current backend archive. No backend files are included or modified in this frontend package.

| Frontend call | Backend controller | Method | Path | Payload/response alignment |
|---|---|---|---|---|
| `api.login` | AuthController | POST | `/api/auth/login` | LoginRequest -> LoginResponse |
| `api.register` | AuthController | POST | `/api/auth/register` | RegisterRequest -> success string |
| `api.dashboard` | DashboardController | GET | `/api/dashboard/summary` | DashboardSummaryDTO |
| `api.projects` | ProjectController | GET | `/api/projects` | optional `status` -> ProjectResponseDTO[] |
| `api.project` | ProjectController | GET | `/api/projects/{projectId}` | ProjectResponseDTO |
| `api.createProject` | ProjectController | POST | `/api/projects` | ProjectRequestDTO -> ProjectResponseDTO |
| `api.updateProject` | ProjectController | PUT | `/api/projects/{projectId}` | ProjectRequestDTO -> ProjectResponseDTO |
| `api.generateRisk` | RiskController | POST | `/api/projects/{projectId}/risk/generate` | RiskScoreDTO |
| `api.latestRisk` | RiskController | GET | `/api/projects/{projectId}/risk/latest` | RiskScoreDTO |
| `api.alerts` | AlertController | GET | `/api/alerts` | AlertDto[] |
| `api.acknowledgeAlert` | AlertController | POST | `/api/alerts/{alertId}/acknowledge` | AlertDto |
| `api.ministries` | MinistryController | GET | `/api/ministries` | MinistryDto[] |
| `api.createMinistry` | MinistryController | POST | `/api/ministries` | MinistryDto -> MinistryDto |
| `api.sectors` | MinistryController | GET | `/api/sectors` | SectorDto[] |
| `api.createSector` | MinistryController | POST | `/api/sectors` | SectorDto -> SectorDto |
| `api.sessions` | ChatbotController | GET | `/api/chatbot/sessions` | Long[] |
| `api.history` | ChatbotController | GET | `/api/chatbot/sessions/{sessionId}/messages` | ChatMessageDTO[] |
| `api.chat` | ChatbotController | POST | `/api/chatbot/query` | ChatQueryDTO -> ChatResponseDTO |

## CORS / ports

The supplied backend SecurityConfig allows `http://localhost:5173` and `http://localhost:5174`. This regenerated frontend uses **5173** so it can run alongside an earlier SETU build on 5174 without changing the backend.

## Important

The source-level contract has been cross-checked here. A real HTTP smoke test against `localhost:8080` cannot be performed from the build environment because that is the user's local backend process.
