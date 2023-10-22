package pl.dobos.tasker.exceptions;

public class EmptySecurityContextException extends RuntimeException {

    public EmptySecurityContextException(String message) {
      super(message);
    }
}
