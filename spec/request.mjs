import {Request} from './../lib/request.mjs';

describe('#Request', () => {
  
  it('creates a new API Gateway Request', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      }
    };
    let request = new Request(event);
    expect(request.type).toEqual('aws:apigateway');
  });
  
  it('sets API Gateway Request file correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      }
    };
    let request = new Request(event);
    expect(request.file).toEqual('apigateway/page');
  });
  
  it('sets API Gateway Request method correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      }
    };
    let request = new Request(event);
    expect(request.method).toEqual('GET');
  });
  
  it('sets API Gateway Request quertStringParameters correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "queryStringParameters": {
        "foo": "bar"
      }
    };
    let request = new Request(event);
    expect(request.queryStringParameters).toEqual({ foo: 'bar' });
  });
  
  it('sets API Gateway Request pathParameters correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "pathParameters": {
        "foo": "bar"
      }
    };
    let request = new Request(event);
    expect(request.pathParameters).toEqual({ foo: 'bar' });
  });
  
  it('sets API Gateway Request cookies correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "cookies": [
        "foo=bar"
      ]
    };
    let request = new Request(event);
    expect(request.cookies).toEqual({ foo: 'bar' });
  });
  
  it('sets API Gateway Request headers correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "headers": {
        "Content-Type": "application/json"
      }
    };
    let request = new Request(event);
    expect(request.headers).toEqual({ 'content-type': 'application/json' });
  });
  
  it('checks for API Gateway Request valid csrf correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "headers": {
        "x-csrf": "foo"
      },
      "cookies": [
        "csrf=foo"
      ]
    };
    let request = new Request(event);
    expect(request.isValidCsrf).toEqual(true);
  });
  
  it('rejects API Gateway Request invalid csrf correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "headers": {
        "x-csrf": "foo"
      },
      "cookies": [
        "csrf=bar"
      ]
    };
    let request = new Request(event);
    expect(request.isValidCsrf).toEqual(false);
  });
  
  it('sets API Gateway Request body correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "body": "foo"
    };
    let request = new Request(event);
    expect(request.body).toEqual('foo');
  });
  
  it('sets API Gateway Request body application/json correctly', async () => {
    const event = {
      "routeKey": "GET /page",
      "requestContext": {
        "http": {
          "method": "GET"
        }
      },
      "headers": {
        "Content-Type": "application/json"
      },
      "body": '{"foo": "bar"}'
    };
    let request = new Request(event);
    expect(request.body).toEqual({ foo: 'bar' });
  });
  
})