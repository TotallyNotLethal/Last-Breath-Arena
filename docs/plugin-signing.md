# Plugin API Signing

Each plugin request must send:
- `x-plugin-signature`: SHA-256 HMAC hex digest over the **raw request body**
- JSON payload with `server_match_id`, `website_match_id`, `player1_uuid`, `player2_uuid`, `arena_id`, `duel_type`, `timestamp`

Result payload `result` values:
- `WINNER_PLAYER_1`
- `WINNER_PLAYER_2`
- `DRAW`
- `CANCELLED`
- `CHEAT_FLAG`
- `DISCONNECT_FORFEIT_PLAYER_1`
- `DISCONNECT_FORFEIT_PLAYER_2`

All plugin calls are persisted to `ApiAuditLog` for auditability.
