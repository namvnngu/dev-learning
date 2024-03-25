package nnfunny.gui;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class LaunchPage implements ActionListener {
  JFrame frame = new JFrame();
  JButton button = new JButton("New window");

  LaunchPage() {
    button.setBounds(100, 160, 200, 200);
    button.setFocusable(false);
    button.addActionListener(this);

    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setSize(500, 500);
    frame.setLayout(null);
    frame.setVisible(true);
    frame.add(button);
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    if (e.getSource() == button) {
      frame.dispose();
      NewWindow newWindow = new NewWindow();
    }
  }
}
