# Shynvo Apps Merge

This repository now contains both frontend codebases:

- `.` (repo root): `shynvo-web` production frontend
- `apps/pri`: imported `shynvo_pri` frontend

## Railway deploy target

For your current production service, keep using the repository root.

- Root Directory: empty
- Build Command: `npm run build`
- Start Command: `npm run start`
- Port: `3000`

## Next migration step (optional)

If you later want true monorepo routing (`apps/web` + `apps/pri`), do it in a dedicated migration so production remains stable.
