# Serve all environments

```bash
python serve_all_environments.py
```

Open [http://localhost:9000](http://localhost:9000). The home page is on port 9000. Each app starts on the next port (9001, 9002, …).

```bash
python serve_all_environments.py --port 8000
python serve_all_environments.py --host 0.0.0.0
```

`--port` sets the home page port (default `9000`). `--host` sets the bind address (default `localhost`). Use `0.0.0.0` to accept connections from other machines.

Stop with Ctrl+C.
