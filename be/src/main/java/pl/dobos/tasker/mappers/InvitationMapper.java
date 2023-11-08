package pl.dobos.tasker.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.dobos.tasker.models.dtos.Invitation;

@Mapper(componentModel = "spring", uses = TasksCategoryMapper.class)
public interface InvitationMapper {

  @Mapping(target = "senderEmail", source = "sender.email")
  Invitation getInvitation(pl.dobos.tasker.models.entities.Invitation source);

  List<Invitation> getInvitationList(List<pl.dobos.tasker.models.entities.Invitation> source);
}
