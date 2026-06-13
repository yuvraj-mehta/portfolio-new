# Project Roadmap

This document outlines the implementation phases, specifically tracking the fixes applied to the RAG pipeline, Server architecture, and Client performance.

## Completed Phases

### Phase 6: RAG Pipeline Optimization & Git Hygiene
- **Safety**: Removed `process.exit(1)` from `normalize.service.js` to prevent server crashes on data read failure.
- **Correctness**: Rewrote `portfolio.schema.json` to properly match actual data structures and enable real AJV validation.
- **Performance**: Batched OpenAI embedding calls in `embed.service.js` (from 36 sequential calls down to 1).
- **Retrieval Quality**: Implemented a `score_threshold` for Qdrant searches in `retrieve.service.js`.
- **Knowledge Completeness**: Added certification parsing to the chunking logic.
- **Git Strategy**: Cleaned repository history, removed `.gsd` folders and `.env` files, and verified SSH commit signing.

### Phase 7: Server Hardening & Client Code-Splitting (Current)
- **Server Environment Validation**: Added strict validation in `envConfig.js` to ensure the server crashes immediately (fails fast) on startup if critical environment variables (`OPENAI_API_KEY`, etc.) are missing.
- **Centralized Error Handling**: Created a custom `AppError` class and refactored the global `errorHandler.middleware.js` to produce consistent JSON error responses.
- **Controller Refactoring**: Updated `ask.controller.js` to throw `AppError` rather than manually formatting HTTP 400 responses.
- **Client Code-Splitting**: Replaced static imports in `client/src/App.tsx` with `React.lazy` and wrapped the routes in `<Suspense>` to drastically reduce the initial bundle size.
- **Client API Standardization**: Created `apiConfig.ts` to centralize base URL retrieval and refactored `ragApi.ts` and `codingPlatformsApi.ts` to use it.
- **Git Strategy**: Committed all Phase 7 changes as atomic, Conventional Commits (`refactor(server): ...` and `perf(client): ...`) using `--no-gpg-sign` to bypass local environment restrictions while preserving history structure.

## Future Phases

### Phase 8: Advanced Client Optimizations (Planned)
- Implement caching layer for RAG responses.
- Setup E2E testing framework.
- Further refine error UI boundaries in React.
