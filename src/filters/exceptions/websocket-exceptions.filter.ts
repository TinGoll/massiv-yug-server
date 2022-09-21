import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter<T> implements BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as WebSocket;
    const data = host.switchToWs().getData();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };
    client.send(
      JSON.stringify({
        event: 'error',
        data: {
          id: (client as any).id,
          rid: data.rid,
          ...details,
        },
      }),
    );
  }

  handleError<TClient extends { emit: Function }>(
    client: TClient,
    exception: any,
  ): void {
    console.log('handleError', 'exception', exception);
    
  }
  handleUnknownError<TClient extends { emit: Function }>(
    exception: any,
    client: TClient,
  ): void {

  }
  isExceptionObject(err: any): err is Error {
    return err;
  }
}
